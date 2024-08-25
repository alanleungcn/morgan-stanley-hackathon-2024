import { useCharts } from "@/api/chart/use-charts";

import { VegaLite } from "react-vega";

export const Wellbeing = () => {
  const { data, isSuccess } = useCharts();

  return isSuccess ? (
    <div className="flex justify-center">
      <div className="flex w-full flex-col gap-5 p-8">
        <h1 className="text-4xl font-bold">Statistics</h1>

        <div className="space-y-4">
          <div className="flex space-x-4">
            <div className="rounded-md bg-primary/30 p-6 shadow">
              <div className="font-mono text-xl font-black">150</div>
              Emails Sent (+18%)
            </div>
            <div className="rounded-md bg-primary/30 p-6 shadow">
              <div className="font-mono text-xl font-black">90</div>
              Event Reviews (+12%)
            </div>
            <div className="rounded-md bg-primary/30 p-6 shadow">
              <div className="font-mono text-xl font-black">130</div>
              Wellbeing Received (+15%)
            </div>
          </div>

          <h1 className="text-2xl font-bold">Event Review</h1>
          <VegaLite spec={data.reviewCharts} />
          <VegaLite spec={data.eventTypesChart} />

          <h1 className="text-2xl font-bold">Wellbeing Review</h1>
          <VegaLite spec={data.wellbeingDistributionChart} />
          <VegaLite spec={data.wellbeingCharts} />
        </div>
      </div>
    </div>
  ) : null;
};
