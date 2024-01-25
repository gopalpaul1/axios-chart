// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Funnel,
  FunnelChart,
  LabelList,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Tooltip,
  Treemap,
} from "recharts";

const Axios = () => {
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    axios
      .get("https://openapi.programming-hero.com/api/phones?search=iphone")
      .then((data) => {
        const loadedData = data.data.data;
        const phoneData = loadedData.map((phone) => {
          const parts = phone.slug.split("-");
          const price = parseInt(parts[1]);
          const phoneInfo = {
            name: phone.phone_name,
            price: price,
          };
          return phoneInfo;
        });
        console.log(phoneData);
        setPhones(phoneData);
      });
  }, []);
  return (
    <div>
      <div>
        <RadarChart outerRadius={90} width={730} height={250} data={phones}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis angle={30} domain={[0, 150]} />
          <Radar
            dataKey="price"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
        <h2 className="text-purple-600 text-2xl">Radar Chart</h2>
      </div>

      <div>
        <FunnelChart width={730} height={300}>
          <Tooltip></Tooltip>
          <Funnel dataKey="price" data={phones} isAnimationActive>
            <LabelList
              position="right"
              fill="#000"
              stroke="none"
              dataKey="name"
            ></LabelList>
          </Funnel>
        </FunnelChart>
        <h2 className="text-purple-600 text-2xl">FunnelChart</h2>
      </div>
      <div>
        <Treemap
          width={730}
          height={250}
          data={phones}
          dataKey="price"
          aspectRatio={4 / 3}
          stroke="#fff"
          fill="#8884d8"
        />
        <h2 className="text-purple-600 text-2xl">Treemap Chart</h2>
      </div>
    </div>
  );
};

export default Axios;
