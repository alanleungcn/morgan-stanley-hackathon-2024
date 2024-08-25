import { useQuery } from "@tanstack/react-query";
import { apiClient } from "..";

export function useCharts() {
  return useQuery({
    queryKey: ["charts"],
    queryFn: async () => {
      const resReviewCharts = await apiClient.get(`/getReviewCharts`);
      const resEventTypesChart = await apiClient.get(
        `/getEventChart_EventTypes`,
      );
      const resWellbeingCharts = await apiClient.get(`/getWellbeingCharts`);
      const resWellbeingDistributionChart = await apiClient.get(
        `/getWellbeingChartDistribution`,
      );
      return {
        reviewCharts: resReviewCharts.data,
        eventTypesChart: resEventTypesChart.data,
        wellbeingCharts: resWellbeingCharts.data,
        wellbeingDistributionChart: resWellbeingDistributionChart.data,
      };
    },
  });
}
