import { useAppStore } from "@/store";
import { selectUser } from "@/store/user/userSelectors";
import { updatePlayerState } from "@/utils/playerState";
import { insertCoin, Joystick, myPlayer, onPlayerJoin } from "playroomkit"
import { useEffect, useState } from "react"
import { CharacterControll } from "@/components/game/CharacterController"
import { GamePlayer } from "@/types/game/unit";

const TAG = '[PvPGameMode]'

export const PvPGameMode = () => {
  const user = useAppStore(selectUser);
  const [players, setPlayers] = useState<GamePlayer[]>([])
  const [targetId, setTargetId] = useState<string>()

  const start = async () => {
    await insertCoin();
  }

  useEffect(() => {
    // Start the game. TODO: change the default insertCoin logic later
    start();
    onPlayerJoin((state) => {
      const joystick = new Joystick(state, {
        type: "angular",
        buttons: [{ id: "next-target", label: "target" }]
      })

      const newPlayer = { state, joystick }

      console.info(`${TAG}: player ${user?.username} joined`)

      const player = user?.player
      if (!player) {
        console.error(`${TAG}: player does not found in store`)
        return
      }
      updatePlayerState(state, player)

      setPlayers((players) => [...players, newPlayer])

      state.onQuit(() => {
        setPlayers((players) => players.filter((p) => p.state.id !== state.id))
      })
    })
  }, [])

  return (
    <>
      {
        players.map(({ state, joystick }, idx) =>
          <CharacterControll
            key={state.id}
            state={state}
            players={players}
            joystick={joystick}
            userPlayer={state.id === myPlayer()?.id}
            position-x={idx * 2}
            highlight={targetId === state.id}
            setTargetId={setTargetId}
            targetId={targetId}
          />)
      }
    </>
  )
}
