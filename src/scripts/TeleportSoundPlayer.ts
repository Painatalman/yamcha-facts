import SoundPlayer from './interfaces/SoundPlayer'

class TeleportSoundPlayer implements SoundPlayer {
  static sound:HTMLAudioElement = new Audio(
    'https://www.myinstants.com/media/sounds/dbz-teleport.mp3'
  )

  play() {
    const { sound } = TeleportSoundPlayer

    // might not be loaded yet
    sound.play && sound.play()
  }
}

export default TeleportSoundPlayer
