import { Trans } from "@lingui/macro";
import { useEffect, useMemo, useState } from "react";

import usePagination, { DEFAULT_PAGE_SIZE } from "components/Referrals/usePagination";
import { getIcon } from "config/icons";
import { useMarketsInfoDataToIndexTokensStats } from "context/SyntheticsStateContext/hooks/statsHooks";
import { getMarketIndexName, getMarketPoolName } from "domain/synthetics/markets";
import { IndexTokenStat } from "domain/synthetics/stats/marketsInfoDataToIndexTokensStats";
import { stripBlacklistedWords } from "domain/tokens/utils";
import { useChainId } from "lib/chains";
import { importImage } from "lib/legacy";
import { formatAmount, formatRatePercentage, formatUsd, formatUsdPrice } from "lib/numbers";
import { useFuse } from "lib/useFuse";

import { BottomTablePagination } from "components/Pagination/BottomTablePagination";
import SearchInput from "components/SearchInput/SearchInput";
import { MarketListSkeleton } from "components/Skeleton/Skeleton";
import { Sorter, useSorterHandlers } from "components/Sorter/Sorter";
import StatsTooltipRow from "components/StatsTooltip/StatsTooltipRow";
import { TableTd, TableTh, TableTheadTr, TableTr } from "components/Table/Table";
import { TableScrollFadeContainer } from "components/TableScrollFade/TableScrollFade";
import TooltipWithPortal from "components/Tooltip/TooltipWithPortal";
import AssetDropdown from "pages/Dashboard/AssetDropdown";
import { renderNetFeeHeaderTooltipContent } from "./NetFeeHeaderTooltipContent";
import { NetFeeTooltip } from "./NetFeeTooltip";

import "./MarketsList.scss";
import { userInfo } from "os";

interface ReferredUser {
  email: string;
  date_joined: string; // Assuming the date string is in ISO 8601 format (e.g., "2025-01-09T15:40:04.980170Z")
  earning: number; // Assuming earning is a number, can be floating point
}

// Interface for the main user info
interface UserInfo {
  email: string;
  cm_wallet: string;
  referral_code: string;
  availability: {
    fee_percentage: number;
    hours: number;
  };
  is_program_active: boolean;
  total_execute: number;
  elapsed: number;
  referred_users: ReferredUser[]; // Array of referred users
  usdt_balance: number;
  tron_balance: number;
}

export function MarketsList() {
  const { chainId } = useChainId();

  const indexTokensStats = useMarketsInfoDataToIndexTokensStats();

  return (
    <>
      <MarketsListDesktop chainId={chainId} indexTokensStats={indexTokensStats} />
    </>
  );
}

function MarketsListDesktop({ chainId, indexTokensStats }: { chainId: number; indexTokensStats: IndexTokenStat[] }) {
  const [userInfo, setUserInfo] = useState<UserInfo>();
  useEffect(() => {
    const storedUserInfoString = localStorage.getItem("userInfo");

    if (storedUserInfoString) {
      try {
        // Parse the JSON string and update state
        const parsedUserInfo: UserInfo = JSON.parse(storedUserInfoString);
        setUserInfo(parsedUserInfo);
      } catch (error) {
        console.error("Error parsing user info from localStorage:", error);
      }
    }
  }, []);

  const { orderBy, direction, getSorterProps } = useSorterHandlers<
    "price" | "tvl" | "liquidity" | "utilization" | "unspecified"
  >();
  const [searchText, setSearchText] = useState("");

  const filteredMarkets = useFilterSortMarkets({ searchText, indexTokensStats, orderBy, direction });

  // const { currentPage, currentData, pageCount, setCurrentPage } = usePagination(
  //   `${chainId} ${direction} ${orderBy} ${searchText}`,
  //   filteredMarkets,
  //   DEFAULT_PAGE_SIZE
  // );

  return (
    <div className="my-15 rounded-4 bg-slate-800 text-left">
      <TableScrollFadeContainer>
        <table className="w-[max(100%,900px)]">
          <thead className="text-body-large">
            <TableTheadTr bordered>
              <TableTh>Referral Member</TableTh>
              <TableTh>
                <Sorter {...getSorterProps("price")}>Registration Date</Sorter>
              </TableTh>
              <TableTh>
                <Sorter {...getSorterProps("tvl")}>Grade</Sorter>
              </TableTh>
              <TableTh>
                <Sorter {...getSorterProps("liquidity")}>Earnings</Sorter>
              </TableTh>
            </TableTheadTr>
          </thead>
          <tbody>
            {indexTokensStats.length > 0 &&
              userInfo?.referred_users.map((stats) => <MarketsListDesktopItem key={stats.email} stats={stats} />)}
          </tbody>
        </table>
      </TableScrollFadeContainer>
      {/* <BottomTablePagination page={currentPage} pageCount={pageCount} onPageChange={setCurrentPage} /> */}
    </div>
  );
}

function useFilterSortMarkets({
  indexTokensStats,
  searchText,
  orderBy,
  direction,
}: {
  indexTokensStats: IndexTokenStat[];
  searchText: string;
  orderBy: string;
  direction: string;
}) {
  const fuse = useFuse(
    () =>
      indexTokensStats.map((indexTokenStat, index) => ({
        id: index,
        name: stripBlacklistedWords(indexTokenStat.token.name),
        symbol: indexTokenStat.token.symbol,
        address: indexTokenStat.token.address,
      })),
    indexTokensStats.map((indexTokenStat) => indexTokenStat.token.address)
  );

  const filteredMarkets = useMemo(() => {
    if (!searchText.trim()) {
      return indexTokensStats;
    }

    return fuse.search(searchText).map((result) => indexTokensStats[result.item.id]);
  }, [indexTokensStats, searchText, fuse]);

  const sortedMarkets = useMemo(() => {
    if (orderBy === "unspecified" || direction === "unspecified") {
      return filteredMarkets;
    }

    return filteredMarkets.slice().sort((a, b) => {
      const directionMultiplier = direction === "asc" ? 1 : -1;

      if (orderBy === "price") {
        return a.token.prices?.minPrice > b.token.prices?.minPrice ? directionMultiplier : -directionMultiplier;
      }

      if (orderBy === "tvl") {
        return a.totalPoolValue > b.totalPoolValue ? directionMultiplier : -directionMultiplier;
      }

      if (orderBy === "liquidity") {
        return a.totalMaxLiquidity > b.totalMaxLiquidity ? directionMultiplier : -directionMultiplier;
      }

      if (orderBy === "utilization") {
        return a.totalUtilization > b.totalUtilization ? directionMultiplier : -directionMultiplier;
      }

      return 0;
    });
  }, [filteredMarkets, orderBy, direction]);

  return sortedMarkets;
}

function MarketsListDesktopItem({ stats }: { stats: ReferredUser }) {
  // const anyPool = stats.marketsStats[0];

  // const netFeePerHourLong = stats.bestNetFeeLong;
  // const netFeePerHourShort = stats.bestNetFeeShort;
  // const marketIndexName = getMarketIndexName(anyPool.marketInfo);

  return (
    <TableTr key={stats.email} bordered={false} hoverable={false}>
      <TableTd>{stats.email}</TableTd>
      <TableTd>{stats.date_joined}</TableTd>
      <TableTd>Regular User</TableTd>
      <TableTd>{stats.earning}</TableTd>
    </TableTr>
  );
}
