import {OpenAPI} from '../api';

export const getImageURL = (imageName: string) => {
  return `${OpenAPI.BASE}/${imageName}`;
};