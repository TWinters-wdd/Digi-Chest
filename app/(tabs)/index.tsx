
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { listItems, type ListItemsData } from '@dataconnect/generated';

import { colors } from '../../constants/colors';
import { dataConnect } from '../../src/firebase';
import MapView from '../../components/MapView';
        
export default function MapScreen() {
  return <MapView />;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingTop: 28, paddingBottom: 32 },
  eyebrow: { fontSize: 11, fontWeight: '700', letterSpacing: 1.4, color: colors.textMuted },
  title: { marginTop: 4, fontSize: 30, fontWeight: '800', color: colors.text },
  description: { marginTop: 8, fontSize: 15, lineHeight: 22, color: colors.textMuted },
  sectionHeader: { marginTop: 28, marginBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: colors.text },
  refresh: { fontSize: 14, fontWeight: '700', color: colors.accent },
  error: { marginTop: 12, color: colors.danger },
  empty: { padding: 18, borderRadius: 14, backgroundColor: colors.surface, color: colors.textMuted },
  itemCard: { marginBottom: 12, padding: 16, borderRadius: 14, backgroundColor: colors.surface },
  itemName: { fontSize: 17, fontWeight: '700', color: colors.text },
  itemId: { marginTop: 6, fontSize: 11, color: colors.textMuted },
});
