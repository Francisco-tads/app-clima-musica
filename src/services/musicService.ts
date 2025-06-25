import { MusicTrack, WeatherPlaylist } from '../types/weather';

// Simulação de dados musicais baseados no clima
const weatherPlaylists: WeatherPlaylist[] = [
  {
    weather: 'Clear',
    tracks: [
      {
        id: '1',
        title: 'Here Comes The Sun',
        artist: 'The Beatles',
        duration: '3:05',
        cover: 'https://images.pexels.com/photos/1586298/pexels-photo-1586298.jpeg?auto=compress&cs=tinysrgb&w=300',
        audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
      },
      {
        id: '2',
        title: 'Walking on Sunshine',
        artist: 'Katrina & The Waves',
        duration: '3:59',
        cover: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300',
        audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
      }
    ]
  },
  {
    weather: 'Rain',
    tracks: [
      {
        id: '3',
        title: 'Raindrops Keep Falling',
        artist: 'B.J. Thomas',
        duration: '3:02',
        cover: 'https://images.pexels.com/photos/1559821/pexels-photo-1559821.jpeg?auto=compress&cs=tinysrgb&w=300',
        audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
      },
      {
        id: '4',
        title: 'Purple Rain',
        artist: 'Prince',
        duration: '8:41',
        cover: 'https://images.pexels.com/photos/1529360/pexels-photo-1529360.jpeg?auto=compress&cs=tinysrgb&w=300',
        audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
      }
    ]
  },
  {
    weather: 'Clouds',
    tracks: [
      {
        id: '5',
        title: 'Cloudy',
        artist: 'Simon & Garfunkel',
        duration: '2:09',
        cover: 'https://images.pexels.com/photos/1557251/pexels-photo-1557251.jpeg?auto=compress&cs=tinysrgb&w=300',
        audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
      },
      {
        id: '6',
        title: 'Both Sides Now',
        artist: 'Joni Mitchell',
        duration: '4:34',
        cover: 'https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=300',
        audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
      }
    ]
  },
  {
    weather: 'Snow',
    tracks: [
      {
        id: '7',
        title: 'Let It Snow',
        artist: 'Dean Martin',
        duration: '1:57',
        cover: 'https://images.pexels.com/photos/1236701/pexels-photo-1236701.jpeg?auto=compress&cs=tinysrgb&w=300',
        audio: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav'
      }
    ]
  }
];

export const musicService = {
  getPlaylistByWeather(weatherMain: string): MusicTrack[] {
    const playlist = weatherPlaylists.find(p => p.weather === weatherMain);
    return playlist?.tracks || weatherPlaylists[0].tracks;
  },

  getAllTracks(): MusicTrack[] {
    return weatherPlaylists.flatMap(p => p.tracks);
  }
};