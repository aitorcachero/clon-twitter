import goldIcon from '../assets/icons/oro.webp';
import silverIcon from '../assets/icons/plata.webp';
import bronzeIcon from '../assets/icons/bronce.webp';

const getIcon = (i) => {
  switch (i) {
    case 0:
      return goldIcon;
    case 1:
      return silverIcon;
    case 2:
      return bronzeIcon;
    default:
      return '';
  }
};

export default getIcon;
