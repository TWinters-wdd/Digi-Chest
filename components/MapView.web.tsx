import { StyleSheet, Text, View } from 'react-native';

export default function MapView() {
  return (
    <View style={styles.container}>
      <Text>The interactive map will appear on Android or iOS.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
});