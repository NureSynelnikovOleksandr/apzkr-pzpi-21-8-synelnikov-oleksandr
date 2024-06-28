"use client";

import { Line } from "react-chartjs-2";
import ChartJS, { CategoryScale } from "chart.js/auto";
import { useEffect, useState } from "react";

ChartJS.register(CategoryScale);

export default function CowChart({ cowId }: { cowId: number }) {
  // state for chart data
  const [data, setData] = useState<any>([]);

  // fetching data
  useEffect(() => {
    fetch("/api/data/reports")
      .then((res) => res.json())
      .then((data: any[]) => {
        const cowReports = data.filter((d) => d.cow_id == cowId);

        // formatting raw data
        cowReports.forEach((v) => {
          v.time = Date.parse(v.created_at);
        });
        cowReports.sort((a, b) => a.time - b.time);

        // grouping by dates
        const cowStats = Object.groupBy(cowReports, (x) =>
          new Date(x.time).toLocaleDateString(undefined, {
            month: "2-digit",
            day: "2-digit",
          }),
        );

        setData(cowStats);
      })
      .catch((err) => {
        setData(null);
        console.log(err);
      });
  }, []);

  return (
    <div className="w-[700px]">
      {data && (
        <Line
          datasetIdKey="id"
          data={{
            labels: Object.keys(data).map((v) => v),
            datasets: [
              {
                label: "Milk, L",
                data: Object.values<any[]>(data).map(
                  (arr) =>
                    (arr.reduce((a, x) => a + x.info.milkVolume, 0) /
                      arr.length) *
                    2,
                ),
                borderColor: "blue",
                backgroundColor: "blue",
              },
              {
                label: "Heart rate",
                data: Object.values<any[]>(data).map(
                  (v: any[]) =>
                    v.reduce((a, x) => a + x.info.heartRate, 0) / v.length,
                ),
                borderColor: "red",
                backgroundColor: "red",
              },
              {
                label: "Body temp",
                data: Object.values<any[]>(data).map(
                  (v: any[]) =>
                    v.reduce((a, x) => a + x.info.bodyTemp, 0) / v.length,
                ),
                borderColor: "orange",
                backgroundColor: "orange",
              },
              {
                label: "Room temp",
                data: Object.values<any[]>(data).map(
                  (v: any[]) =>
                    v.reduce((a, x) => a + x.info.roomTemp, 0) / v.length,
                ),
                borderColor: "green",
                backgroundColor: "green",
              },
            ],
          }}
        />
      )}
    </div>
  );
}
