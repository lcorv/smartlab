class LocalizedText {
  text: string;
  languageCode: string;
}

class AuthorAttribution {
  displayName: string;
  uri: string;
  photoUri: string;
}

 export class Review {
  name: string;
  relativePublishTimeDescription: string;
  text: LocalizedText;
  originalText: LocalizedText;
  rating: number;
  authorAttribution: AuthorAttribution;
  publishTime: string;
  flagContentUri: string;
  googleMapsUri: string;
}