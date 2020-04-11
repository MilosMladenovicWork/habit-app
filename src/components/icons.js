import React, {useRef, useState, useEffect} from 'react'

import OutShadowContainer from './outshadowcontainer'

import card from '../images/card.svg'
import mail from '../images/mail.svg'
import diamond from '../images/diamond.svg'
import megalophone from '../images/megalophone.svg'
import earth from '../images/earth.svg'
import news from '../images/news.svg'
import blackcat from '../images/blackcat.svg'
import bat from '../images/bat.svg'
import pumpkin from '../images/pumpkin.svg'
import witch from '../images/witch.svg'
import cauldron from '../images/cauldron.svg'
import grave from '../images/grave.svg'
import ghost from '../images/ghost.svg'
import cateyes from '../images/cateyes.svg'
import blackhouse from '../images/blackhouse.svg'
import yellowphone from '../images/yellowphone.svg'
import yellowgamepad from '../images/yellowgamepad.svg'
import yellowtv from '../images/yellowtv.svg'
import yellowskip from '../images/yellowskip.svg'
import yellowmic from '../images/yellowmic.svg'
import yellowstop from '../images/yellowstop.svg'
import yellowmusic from '../images/yellowmusic.svg'
import yellowplay from '../images/yellowplay.svg'
import yellowpause from '../images/yellowpause.svg'
import yellowheadphones from '../images/yellowheadphones.svg'
import shutdown from '../images/shutdown.svg'
import yellowcable from '../images/yellowcable.svg'
import laptop from '../images/laptop.svg'
import booksvertical from '../images/booksvertical.svg'
import cactus from '../images/cactus.svg'
import coffee from '../images/coffee.svg'
import bookshorizontal from '../images/bookshorizontal.svg'
import screen from '../images/screen.svg'
import wallet from '../images/wallet.svg'
import graduation from '../images/graduation.svg'
import page from '../images/page.svg'
import laptopblack from '../images/laptopblack.svg'
import heart from '../images/heart.svg'
import chat from '../images/chat.svg'
import like from '../images/like.svg'
import image from '../images/image.svg'
import camera from '../images/camera.svg'
import tasks from '../images/tasks.svg'
import passport from '../images/passport.svg'
import briefcase from '../images/briefcase.svg'
import globe from '../images/globe.svg'
import donutbrown from '../images/donutbrown.svg'
import donutpink from '../images/donutpink.svg'
import donutblue from '../images/donutblue.svg'
import plane from '../images/plane.svg'
import cameralense from '../images/cameralense.svg'
import settings from '../images/settings.svg'
import clock from '../images/clock.svg'
import video from '../images/video.svg'
import lightbulb from '../images/lightbulb.svg'
import floppyblack from '../images/floppyblack.svg'
import floppygreen from '../images/floppygreen.svg'
import floppyyellow from '../images/floppyyellow.svg'
import floppypink from '../images/floppypink.svg'
import floppyblue from '../images/floppyblue.svg'
import fire from '../images/fire.svg'
import sock from '../images/sock.svg'
import christmas from '../images/christmas.svg'
import campfire from '../images/campfire.svg'
import christmascandles from '../images/christmascandles.svg'
import pumpkinrockstar from '../images/pumpkinrockstar.svg'
import blackgrave from '../images/blackgrave.svg'
import poison from '../images/poison.svg'
import deathreaper from '../images/deathreaper.svg'
import candlegreen from '../images/candlegreen.svg'
import darkcauldron from '../images/darkcauldron.svg'
import greenhand from '../images/greenhand.svg'
import web from '../images/web.svg'
import raven from '../images/raven.svg'
import pumpkinevil from '../images/pumpkinevil.svg'
import ghostwhite from '../images/ghostwhite.svg'
import pencil from '../images/pencil.svg'
import tape from '../images/tape.svg'
import microscope from '../images/microscope.svg'
import statistics from '../images/statistics.svg'
import poisongreen from '../images/poisongreen.svg'
import bowlingball from '../images/bowlingball.svg'
import pin from '../images/pin.svg'
import plant from '../images/plant.svg'
import tube from '../images/tube.svg'
import bitcoinshiny from '../images/bitcoinshiny.svg'
import bitcoin from '../images/bitcoin.svg'
import bitcoinchip from '../images/bitcoinchip.svg'
import eye from '../images/eye.svg'
import key from '../images/key.svg'
import monitor from '../images/monitor.svg'
import keyboard from '../images/keyboard.svg'
import mouse from '../images/mouse.svg'
import stopwatch from '../images/stopwatch.svg'

import './icons.css'

const icons = [
  card,
  mail,
  diamond,
  megalophone,
  earth,
  news,
  blackcat,
  bat,
  pumpkin,
  witch,
  cauldron,
  grave,
  ghost,
  cateyes,
  blackhouse,
  yellowphone,
  yellowgamepad,
  yellowtv,
  yellowskip,
  yellowmic,
  yellowstop,
  yellowmusic,
  yellowplay,
  yellowpause,
  yellowheadphones,
  shutdown,
  yellowcable,
  laptop,
  booksvertical,
  cactus,
  coffee,
  bookshorizontal,
  screen,
  wallet,
  graduation,
  page,
  laptopblack,
  heart,
  chat,
  like,
  image,
  camera,
  tasks,
  passport,
  briefcase,
  globe,
  donutbrown,
  donutpink,
  donutblue,
  plane,
  cameralense,
  settings,
  clock,
  video,
  lightbulb,
  floppyblack,
  floppygreen,
  floppyyellow,
  floppypink,
  floppyblue,
  fire,
  sock,
  christmas,
  campfire,
  christmascandles,
  pumpkinrockstar,
  blackgrave,
  poison,
  deathreaper,
  candlegreen,
  darkcauldron,
  greenhand,
  web,
  raven,
  pumpkinevil,
  ghostwhite,
  pencil,
  tape,
  microscope,
  statistics,
  poisongreen,
  bowlingball,
  pin,
  plant,
  tube,
  bitcoinshiny,
  bitcoin,
  bitcoinchip,
  eye,
  key,
  monitor,
  keyboard,
  mouse,
  stopwatch
]

function Icons({
  handleIcon,
  selectedIcon
}){
  const [addIcons, setAddIcons] = useState(1)
  const [containerHeight, setContainerHeight] = useState()
  const [scrollHeight, setScrollHeight] = useState()

  const iconsContainer = useRef()

  function scrollInContainer(){
      if(scrollHeight <= containerHeight + iconsContainer.current.scrollTop + 2){
        setAddIcons(prevState => prevState + 1)
      }
  }

  useEffect(() => {
    setScrollHeight(iconsContainer.current.scrollHeight)
  },[addIcons])

  useEffect(() => {
    setContainerHeight(iconsContainer.current.clientHeight)
  }, [])

  return(
    <div 
    ref={iconsContainer}
    className='icons-container' onScroll={() => scrollInContainer()}>
      {
        icons.map((icon, index) =>
          index < addIcons * 12 && <div style={{width:'fit-content', width:'21%', marginLeft:'2%', marginRight:'2%'}} onClick={(e) => handleIcon(e)}>
            <OutShadowContainer style={{marginBottom:'12px'}} className={selectedIcon === icon ? 'in-shadow-container' : null} key={index}>
              <img src={icon} style={{width:'100%'}}/>
            </OutShadowContainer>
          </div>
        ) 
      }
    </div>    
  )
}

export default Icons