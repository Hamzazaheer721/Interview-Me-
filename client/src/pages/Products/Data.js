import Img1 from '../../images/svg-1.svg' 
import Img2 from '../../images/svg-2.svg'
import Img3 from '../../images/svg-3.svg'
import Profile from '../../images/profile.jpg';

export const homeObjOne = {
  lightBg: true,
  lightText: false,
  lightTopLine: false,
  lightTextDesc: false,
  topLine: 'View Our Products',
  headline: 'Shop through our catalog of products',
  description:
    'We provide worldwide shipping to all countries. If there are any issues, just issue a refund and we will process your request',
  buttonLabel: 'Shop Now',
  imgStart: '',
  img: Img1,
  alt: 'Credit Card'
};

export const homeObjTwo = {
  lightBg: false,
  lightText: true,
  lightTopLine: true,
  lightTextDesc: true,
  topLine: '100% Secure',
  headline: 'Stay protected 24/7 anywhere anytime',
  description:
    'We have you covered no matter where you are located. Over 140 locations worldwide to ensure you have access anytime',
  buttonLabel: 'Learn More',
  imgStart: '',
  img: Img3,
  alt: 'Vault'
};

export const homeObjThree = {
  lightBg: true,
  lightText: false,
  lightTextDesc: false,
  topLine: 'Easy Setup',
  headline: 'Super fast and simple onboarding process',
  description:
    "Get everything set up and ready in under 10 minutes. All you need to do is add your information and you're ready to go.",
  buttonLabel: 'Start Now',
  imgStart: 'start',
  img: Img2,
  alt: 'Vault'
};

export const homeObjFour = {
  lightBg: false,
  lightText: true,
  lightTextDesc: true,
  topLine: 'DATA ANALYTICS',
  headline: 'Every transaction is stored on our secure cloud database',
  description:
    'Never ever have to worry again about saved reciepts. We store your data, so you can access it anytime.',
  buttonLabel: 'Sign Up Now',
  imgStart: 'start',
  img: Img1,
  alt: 'Vault'
};
