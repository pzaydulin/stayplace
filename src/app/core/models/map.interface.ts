
export interface MapMarkerConfig<T = any> {
  position: {
    lat: number;
    lng: number;
  };
  content: Node | null;
  data: T;
}
