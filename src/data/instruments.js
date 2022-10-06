import * as Tone from 'tone';

export const toneObject = Tone;

export const toneTransport = toneObject.Transport;

// export const tonePart = new toneObject.Part((time, note) => {
//   guitar.triggerAttackRelease(note, '8n', time);
// }, []).start(0);

export const tonePart = [
  new toneObject.Part((time, note) => {
    piano.triggerAttackRelease(note, '8n', time);
  }, []).start(0),
  new toneObject.Part((time, note) => {
    french_horn.triggerAttackRelease(note, '8n', time);
  }, []).start(0),
  new toneObject.Part((time, note) => {
    guitar.triggerAttackRelease(note, '8n', time);
  }, []).start(0),
  new toneObject.Part((time, note) => {
    drums.triggerAttackRelease(note, '8n', time);
  }, []).start(0),
];

export const getTonePart = (instrum) => {
  switch (instrum) {
    case 'Piano':
      return tonePart[0];
    case 'French Horn':
      return tonePart[1];
    case 'Guitar':
      return tonePart[2];
    case 'Drums':
      return tonePart[3];
    default:
      console.log(`Wrong instrument, ${instrum} try again!`);
  }
};

export const getToneInstrum = (instrum) => {
  switch (instrum) {
    case 'Piano':
      return piano;
    case 'French Horn':
      return french_horn;
    case 'Guitar':
      return guitar;
    case 'Drums':
      return drums;
    default:
      console.log(`Wrong instrument, ${instrum} try again!`);
  }
};

export const guitar = new toneObject.Sampler({
  urls: {
    B3: 'B3.mp3',
    A3: 'A3.mp3',
    G3: 'G3.mp3',
    F3: 'F3.mp3',
    E3: 'E3.mp3',
    D3: 'D3.mp3',
    C3: 'C3.mp3',
  },
  release: 1,
  baseUrl: '/samples/guitar-acoustic/',
}).toDestination();

export const french_horn = new toneObject.Sampler({
  urls: {
    B3: 'F5.mp3',
    A3: 'A3.mp3',
    G3: 'G2.mp3',
    F3: 'F3.mp3',
    E3: 'Ds2.mp3',
    D3: 'D3.mp3',
    C3: 'C2.mp3',
  },
  release: 1,
  baseUrl: '/samples/french-horn/',
}).toDestination();

export const piano = new toneObject.Sampler({
  urls: {
    B3: 'B3.mp3',
    A3: 'A3.mp3',
    G3: 'G3.mp3',
    F3: 'F3.mp3',
    E3: 'E3.mp3',
    D3: 'D3.mp3',
    C3: 'C3.mp3',
  },
  release: 1,
  baseUrl: '/samples/piano/',
}).toDestination();

export const drums = new toneObject.Sampler({
  urls: {
    B3: 'drums1.mp3',
    A3: 'drums2.mp3',
    G3: 'drums3.mp3',
    F3: 'drums4.mp3',
    E3: 'drums5.mp3',
    D3: 'drums6.mp3',
    C3: 'drums7.mp3',
  },
  release: 1,
  baseUrl: '/samples/drums/',
}).toDestination();
