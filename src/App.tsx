import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Counter } from "@/components/ton/Counter";
import { Jetton } from "@/components/ton/Jetton";
import { TransferTon } from "@/components/ton/TransferTon";
import styled from "styled-components";
import { Button, FlexBoxCol, FlexBoxRow } from "@/components/styled/styled";
import { useTonConnect } from "@/hooks/ton/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import "@twa-dev/sdk";
import { Game } from "@/components/game/Game";

const StyledApp = styled.div`
  background-color: #e8e8e8;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 100vh;
  padding: 20px 20px;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

function App() {
  const { network } = useTonConnect();

  return (
    <StyledApp>
      <AppContainer>
        <FlexBoxCol>
          <FlexBoxRow>
            <TonConnectButton />
            <Button>
              {network
                ? network === CHAIN.MAINNET
                  ? "mainnet"
                  : "testnet"
                : "N/A"}
            </Button>
          </FlexBoxRow>
          <Game />
        </FlexBoxCol>
      </AppContainer>
    </StyledApp>
  );
}

export default App;
