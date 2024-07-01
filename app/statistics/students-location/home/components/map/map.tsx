import React, { useRef, useState } from "react";
import data from "./data.json";
import {
  YMaps,
  Map,
  ZoomControl,
  TypeSelector,
  ObjectManager,
} from "@pbe/react-yandex-maps";
import env from "utils/env";

const YandexMap = () => {
  const map = useRef<any>(null);

  const [state, setState] = useState({
    address: [41.3053010448335, 69.2648524581862],
    zoom: 13,
  });

  return (
    <YMaps
      query={{
        apikey: env.yandex_api_key,
        lang: "en_US",
      }}
    >
      <Map
        instanceRef={map}
        options={{
          nativeFullscreen: true,
          copyrightProvidersVisible: true,
        }}
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

        <ObjectManager
          clusterize={true}
          clusters={{
            preset: "islands#yellowClusterIcons",
          }}
          options={{
            clusterize: true,
            gridSize: 64,
            clusterDisableClickZoom: false,
            clusterIconLayout: "default#pieChart",
          }}
          features={data?.map((i, index) => ({
            type: "Feature",
            id: index + 1,
            properties: { balloonContent: i.name },
            geometry: { type: "Point", coordinates: i.location },
            options: {
              iconLayout: "default#image", // Use a custom image for the icon
              iconImageHref:
                index % 2 == 0
                  ? "/statistics/blue-circle.svg"
                  : "/statistics/red-circle.svg", // URL to your custom icon image
              iconImageSize: [16, 16], // Size of the icon
              // iconImageOffset: [-15, -42] // Offset of the icon
            },
          }))}
          objects={{
            preset: "islands#redDotIcon",
          }}
          modules={[
            "objectManager.addon.objectsBalloon",
            "objectManager.addon.objectsHint",
          ]}
        />

        {/* {data?.map((item, index) => {
            return (
              <Placemark
                key={index}
                geometry={item.location}
                options={{
                  iconColor: colors.blacksecondary,
                  iconShape: {
                    type: "Rectangle"
                  }
                }}
                onClick={() => handleClick(item)}
                properties={{
                  hintContent: item.description,
                  balloonContent: item.description
                }}
              />
            );
          })} */}
      </Map>
    </YMaps>
  );
};

export default YandexMap;
