import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet';
import { StyleSheet, View } from 'react-native';

const mapCenter: [number, number] = [39.7392, -104.9903];

export default function MapView() {
  return (
    <View style={styles.container}>
      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
        style={styles.map}
        >
          <TileLayer
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>' />

            <Marker position={mapCenter}>
              <Popup>Demo treasure location</Popup>
            </Marker>
        </MapContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});