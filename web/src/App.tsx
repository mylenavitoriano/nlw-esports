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
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={LogoImg} alt="Logo NLW eSports" />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map((item) => (
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
