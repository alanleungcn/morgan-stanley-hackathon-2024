import { Star } from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const barData = [
  { name: "Paricipants", Positive: 4000, Negative: 2400 },
  { name: "Volunteers", Positive: 3000, Negative: 1398 },
];

const pieData = [
  { name: "Volunteers", value: 400 },
  { name: "Participants", value: 300 },
  { name: "Others", value: 300 },
  // { name: "Company 2", value: 200 },
  // { name: "ABCD Company", value: 278 },
  // { name: "Group Company 2", value: 189 },
];
const reviewData = [
  {
    name: "John",
    rating: 5,
    comment:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta a harum quas natus sapiente blanditiis laudan.",
    date: "24/08/2024",
  },
  {
    name: "John",
    rating: 2,
    comment:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta a harum quas natus sapiente blanditiis laudan.",
    date: "24/08/2024",
  },
  {
    name: "John",
    rating: 1,
    comment:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta a harum quas natus sapiente blanditiis laudan.",
    date: "24/08/2024",
  },
  {
    name: "John",
    rating: 3,
    comment:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta a harum quas natus sapiente blanditiis laudan.",
    date: "24/08/2024",
  },
  {
    name: "John",
    rating: 4,
    comment:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta a harum quas natus sapiente blanditiis laudan.",
    date: "24/08/2024",
  },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  // "#FF8042",
  // "#FF6384",
  // "#36A2EB",
];

export const Wellbeing = () => {
  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-[1000px] flex-col gap-5 p-8">
        <h1 className="text-4xl font-bold">Wellbeing Statistics</h1>
        <div className="grid grid-cols-2 gap-8">
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-lg font-semibold">
              Positive Vs Negative Feedbacks
            </h2>
            <BarChart width={300} height={200} data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Positive" fill="#A3D067" />
              <Bar dataKey="Negative" fill="#BD1F2D" />
            </BarChart>
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-center text-lg font-semibold">Members</h2>
            <PieChart width={300} height={200} className="">
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Reviews </h2>
            <a href="#" className="text-blue-600 hover:underline">
              View all
            </a>
          </div>
          <table className="w-full text-left">
            <thead className="">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Rating</th>
                <th className="px-4 py-2">Comment</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody className="">
              {reviewData.map((entry, index) => (
                <tr className="border-t">
                  <td className="px-4 py-2">{entry.name}</td>
                  <td className="px-4 py-2 text-blue-600 hover:underline">
                    {/* {entry.rating} */}
                    <div className="flex">
                      {Array(entry.rating)
                        .fill(0)
                        .map((_, index) => (
                          <Star
                            key={index}
                            fill="yellow"
                            className="text-yellow-500"
                          />
                        ))}
                      {Array(5 - entry.rating)
                        .fill(0)
                        .map((_, index) => (
                          <Star key={index} className="text-yellow-500" />
                        ))}
                      {/* <Star fill="yellow" className="text-yellow-500 mr-2" />
                      <Star fill="yellow" className="text-yellow-500 mr-2" />
                      <Star fill="yellow" className="text-yellow-500 mr-2" />
                      <Star fill="yellow" className="text-yellow-500 mr-2" />
                      <Star fill="yellow" className="text-yellow-500 mr-2" /> */}
                    </div>
                  </td>
                  <td className="px-4 py-2"> {entry.comment}</td>
                  <td className="px-4 py-2">{entry.date}</td>
                </tr>
              ))}
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
