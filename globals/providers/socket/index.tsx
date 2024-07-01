import React, { createContext, useContext } from "react";

const SocketContext = createContext<undefined>(undefined);

function SocketProvider({ children }: any) {
  // const sip = useSelector((state: IStore) => state.sip.sip);
  // const [socket, setSocket] = useState<Socket>();

  // const init = async () => {
  // const socket1 = io(env.sipSocket ?? "", {
  //   autoConnect: false,
  // });
  // setSocket(socket1);
  // };
  //
  // useEffect(() => {
  //   sip?.ref?.state?.sipStatus == "sipStatus/REGISTERED" && init();
  //
  //   return () => {
  //     socket?.disconnect();
  //   };
  // }, [sip?.ref?.state?.sipStatus]);
  //
  // useEffect(() => {
  //   if (!!socket && !!sip) {
  //     socket.connect();
  //   }
  // }, [socket, sip?.ref?.state?.sipStatus]);

  return (
    <SocketContext.Provider value={undefined}>
      {children}
    </SocketContext.Provider>
  );
}

const useSocketIO = () => useContext(SocketContext);

export { SocketProvider, SocketContext, useSocketIO };

SocketProvider.getInitialProps = async () => {
  return {};
};
