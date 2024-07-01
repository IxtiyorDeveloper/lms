import React, { useRef, useState } from "react";
import {
  YMaps,
  Map,
  Placemark,
  ZoomControl,
  TypeSelector,
} from "@pbe/react-yandex-maps";
import data from "./data.json";

import { Wrapper } from "./style";
import env from "utils/env";

const Location = () => {
  const map = useRef<any>(null);

  const [info, setInfo] = useState<any>(null);
  const [state, setState] = useState({
    address: [41.3053010448335, 69.2648524581862],
    zoom: 13,
  });

  const handleClick = (item: any) => {
    setInfo(item);
    if (map.current) {
      map.current.panTo(item.location, { duration: 300 });
    }
  };

  return (
    <Wrapper>
      {/* <YandexMap /> */}

      <YMaps
        query={{
          apikey: env.yandex_api_key,
          lang: "en_US",
        }}
      >
        <div>
          <Map
            instanceRef={map}
            defaultState={{
              center: state.address,
              zoom: state.zoom,
              controls: [],
            }}
            width="100%"
            height={500}
            className="map"
          >
            <TypeSelector />
            <ZoomControl options={{ adjustMapMargin: true }} />
            {data?.map((item, index) => {
              return (
                <Placemark
                  key={index}
                  geometry={item.location}
                  options={{
                    iconColor: "black",
                    iconShape: {
                      type: "Rectangle",
                    },
                  }}
                  onClick={() => handleClick(item)}
                  properties={{
                    hintContent: item.description,
                    balloonContent: item.description,
                  }}
                />
              );
            })}
          </Map>
        </div>
      </YMaps>

      {info && (
        <div className="branch_info">
          <h2>{info?.name} filiali</h2>
          <p>{info?.description}</p>
        </div>
      )}
    </Wrapper>
  );
};

export default Location;
