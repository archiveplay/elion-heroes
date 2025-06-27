import { insertCoin, Joystick, myPlayer, onPlayerJoin } from "playroomkit"
import { useEffect, useState } from "react"
import { CharacterControll } from "../CharacterController"

export const PvPGameMode = () => {
  // TODO: types here
  const [players, setPlayers] = useState<any[]>([])

  const start = async () => {
    await insertCoin();
  }

  useEffect(() => {
    start();
    onPlayerJoin((state) => {
      const joystick = new Joystick(state, {
        type: "angular",
        buttons: [{ id: "attack", label: "attack" }]
      })

      const newPlayer = { state, joystick }

      // TODO: state here
      state.setState("health", 100);
      setPlayers((players) => [...players, newPlayer])

      state.onQuit(() => {
        setPlayers((players) => players.filter((p) => p.state.id !== state.id))
      })
    })
  }, [])

  return (
    <>
      {
        players.map(({ state, joystick }, idx) => (
          <CharacterControll key={state.id} state={state} joystic={joystick} userPlayer={state.id === myPlayer()?.id} position-x={idx * 2} />
        ))
      }
    </>
  )
}
