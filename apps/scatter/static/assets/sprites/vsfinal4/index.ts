import { createAsset } from 'pixi-svelte';

import cowboyWinsImg from './cowboy_wins.webp';
import cowboyWinsAtlas from './cowboy_wins.webp.json';

import cowboyDiesImg from './cowboy_dies.webp';
import cowboyDiesAtlas from './cowboy_dies.webp.json';

import indianWinsImg from './indian_wins.webp';
import indianWinsAtlas from './indian_wins.webp.json';

import indianDiesImg from './indian_dies.webp';
import indianDiesAtlas from './indian_dies.webp.json';

export const cowboyWins = createAsset({ img: cowboyWinsImg, atlas: cowboyWinsAtlas });
export const cowboyDies = createAsset({ img: cowboyDiesImg, atlas: cowboyDiesAtlas });
export const indianWins = createAsset({ img: indianWinsImg, atlas: indianWinsAtlas });
export const indianDies = createAsset({ img: indianDiesImg, atlas: indianDiesAtlas });
