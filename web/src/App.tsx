import './styles/main.css'
import LogoImg from './assets/logo.svg'

import { useEffect, useState } from 'react'

import { GameBanner } from './components/GameBanner'
import { CreateAdModal } from './components/CreateAdModal'
import { CreateAdBanner } from './components/CreateAdBanner'

import * as Dialog from '@radix-ui/react-dialog'
import axios from 'axios'

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    Ad: number;
  }
}

function App() {

  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios.get('http://localhost:3333/games')
    .then(response => setGames(response.data))

  }, [])

  return(
    <div className='max-w-[80%] mx-auto flex flex-col items-center justify-center my-20'>
      <img src={LogoImg} alt="Logo NLW eSports" />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
      </h1>

      <div className='flex gap-3 items-center justify-center mt-16 max-w-[100%] overflow-hidden'>
        {games.map((item, index) => (
          <GameBanner bannerUrl={item.bannerUrl} title={item.title} adsCount={item._count.Ad} key={item.id}/>
        ))}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
