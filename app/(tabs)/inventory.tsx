// useState lets the grid remember how much space it was given.
import { useState } from 'react';
// Built-in React Native pieces used to build the screen, read sizes, and measure space.
import {
  type LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

// Gives the screen the current light or dark colors.
import { useTheme } from '../../constants/theme';

// Screens at least this wide get the four-section computer layout.
const WIDE_SCREEN_MIN_WIDTH = 768;
// On phones, the regular inventory shows at least this many boxes (rounded up to full rows).
const INVENTORY_SLOT_COUNT = 36;
// On phones, the equipped section shows at least this many boxes (rounded up to full rows).
const EQUIPPED_SLOT_COUNT = 6;
// Width and height of each inventory box, in pixels.
const SLOT_SIZE = 96;
// Space between boxes, in pixels; also used when counting how many boxes fit.
const SLOT_GAP = 6;

// The Inventory tab: avatar, equipped items, and the regular inventory.
export default function InventoryScreen() {
  // Reads the current theme colors.
  const { colors } = useTheme();
  // Builds the styles using those colors.
  const styles = createStyles(colors);
  // Reads the current window width so the layout can react to it.
  const { width } = useWindowDimensions();
  // True on computers and wide tablets, false on phones.
  const isWide = width >= WIDE_SCREEN_MIN_WIDTH;

  // The top right section on computers; first on phones.
  const avatarSection = (
    // A bordered panel that holds the avatar.
    <View style={[styles.section, styles.avatarSection]}>
      {/* Section heading. */}
      <Text style={styles.heading}>Avatar</Text>
      {/* Fills the panel and centers the placeholder text. */}
      <View style={styles.avatarArea}>
        {/* Stands in for the 3D avatar until it is built. */}
        <Text style={styles.placeholderText}>3D avatar goes here</Text>
      </View>
    </View>
  );

  // The bottom right section on computers; second on phones.
  const equippedSection = (
    // A bordered panel that holds the equipped item boxes.
    <View style={[styles.section, isWide && styles.fill]}>
      {/* Section heading. */}
      <Text style={styles.heading}>Equipped</Text>
      {/* The boxes for items the avatar is using. */}
      <SlotGrid minCount={EQUIPPED_SLOT_COUNT} fillHeight={isWide} styles={styles} />
    </View>
  );

  // The left side on computers; third on phones.
  const inventorySection = (
    // A bordered panel that holds the regular inventory boxes.
    <View style={[styles.section, isWide && styles.fill]}>
      {/* Section heading. */}
      <Text style={styles.heading}>Inventory</Text>
      {/* The grid of empty boxes for collected items. */}
      <SlotGrid minCount={INVENTORY_SLOT_COUNT} fillHeight={isWide} styles={styles} />
    </View>
  );

  // Computer layout: inventory on the left, avatar and equipped stacked on the right.
  if (isWide) {
    // Returns the side-by-side layout.
    return (
      // A row that splits the screen into left and right halves.
      <View style={[styles.screen, styles.wideRow]}>
        {/* Left half: the regular inventory, top and bottom. */}
        <View style={styles.column}>{inventorySection}</View>
        {/* Right half: avatar on top, equipped items below. */}
        <View style={styles.column}>
          {/* Top right. */}
          {avatarSection}
          {/* Bottom right. */}
          {equippedSection}
        </View>
      </View>
    );
  }

  // Phone layout: every section stacked in a scrollable column.
  return (
    // Lets the player scroll when the sections are taller than the phone.
    <ScrollView style={styles.screen} contentContainerStyle={styles.phoneColumn}>
      {/* First: the avatar. */}
      {avatarSection}
      {/* Second: what the avatar is using. */}
      {equippedSection}
      {/* Third: the regular inventory. */}
      {inventorySection}
    </ScrollView>
  );
}

// Describes the values SlotGrid needs.
type SlotGridProps = {
  // On phones, the fewest boxes to draw before rounding up to a full row.
  minCount: number;
  // True on computers: fill the section's height with rows instead of using minCount.
  fillHeight: boolean;
  // The screen's styles, so the boxes match the current theme.
  styles: ReturnType<typeof createStyles>;
};

// Counts how many boxes fit side by side (or top to bottom) in a given length.
function slotsThatFit(length: number) {
  // Each box takes SLOT_SIZE plus one gap; the extra gap accounts for the last box having none.
  return Math.max(1, Math.floor((length + SLOT_GAP) / (SLOT_SIZE + SLOT_GAP)));
}

// Draws a grid of empty item boxes that fills the space it is given.
function SlotGrid({ minCount, fillHeight, styles }: SlotGridProps) {
  // Remembers the grid's measured width and height (zero until the first measurement).
  const [size, setSize] = useState({ width: 0, height: 0 });

  // Saves the grid's new size whenever its space changes, such as a window resize.
  function handleLayout(event: LayoutChangeEvent) {
    // Pulls the width and height out of the layout event.
    const { width, height } = event.nativeEvent.layout;
    // Stores them so the box count is recalculated.
    setSize({ width, height });
  }

  // How many boxes fit across one row.
  const columns = slotsThatFit(size.width);
  // Computers: as many rows as fit; phones: enough rows to hold minCount.
  const rows = fillHeight ? slotsThatFit(size.height) : Math.ceil(minCount / columns);
  // Draws nothing until the grid has been measured, then fills every row completely.
  const count = size.width > 0 ? columns * rows : 0;

  // Returns the grid.
  return (
    // A row that wraps onto new lines; it measures itself so the count can be calculated.
    <View style={[styles.slotGrid, fillHeight && styles.fill]} onLayout={handleLayout}>
      {/* Makes a list of `count` numbers and draws one box for each. */}
      {Array.from({ length: count }, (_, index) => (
        // One empty box; key keeps React's list tracking correct.
        <View key={index} style={styles.slot} />
      ))}
    </View>
  );
}

// Creates the screen's styles from the current theme colors.
function createStyles(colors: ReturnType<typeof useTheme>['colors']) {
  // Returns the finished style sheet.
  return StyleSheet.create({
    // The whole screen's background.
    screen: {
      // Fills all available space.
      flex: 1,
      // Uses the theme's background color.
      backgroundColor: colors.background,
    },
    // Computer layout: places the two halves side by side.
    wideRow: {
      // Lays children out left to right.
      flexDirection: 'row',
      // Space between the halves.
      gap: 16,
      // Space between the halves and the screen edge.
      padding: 16,
    },
    // One half of the computer layout.
    column: {
      // Each half takes an equal share of the width.
      flex: 1,
      // Space between the sections inside a half.
      gap: 16,
    },
    // Phone layout: the stacked column inside the scroll view.
    phoneColumn: {
      // Space between the stacked sections.
      gap: 16,
      // Space between the sections and the screen edge.
      padding: 16,
    },
    // The shared look of every section panel.
    section: {
      // Slightly lighter panel color than the background.
      backgroundColor: colors.surface,
      // Thin outline around the panel.
      borderWidth: 1,
      // Outline color from the theme.
      borderColor: colors.border,
      // Rounded panel corners.
      borderRadius: 12,
      // Space inside the panel.
      padding: 16,
      // Space between the heading and the content.
      gap: 12,
    },
    // Makes a section stretch to fill its half of the screen.
    fill: {
      // Takes all remaining height.
      flex: 1,
    },
    // Gives the avatar section more room than the equipped section.
    avatarSection: {
      // Takes the leftover height on computers.
      flex: 1,
      // Keeps it tall enough to see the avatar on phones.
      minHeight: 300,
    },
    // The space where the 3D avatar will be drawn.
    avatarArea: {
      // Fills the rest of the avatar panel.
      flex: 1,
      // Centers the placeholder text vertically.
      justifyContent: 'center',
      // Centers the placeholder text horizontally.
      alignItems: 'center',
      // Dashed outline marks it as unfinished.
      borderStyle: 'dashed',
      // Thin outline.
      borderWidth: 1,
      // Outline color from the theme.
      borderColor: colors.border,
      // Rounded corners to match the panel.
      borderRadius: 8,
    },
    // The section titles.
    heading: {
      // Medium-large text.
      fontSize: 18,
      // Bold text.
      fontWeight: 'bold',
      // Main text color from the theme.
      color: colors.text,
    },
    // The faded "goes here" text.
    placeholderText: {
      // Faded text color from the theme.
      color: colors.textMuted,
    },
    // The wrapping row of item boxes.
    slotGrid: {
      // Lays boxes out left to right.
      flexDirection: 'row',
      // Moves boxes to a new line when the row is full.
      flexWrap: 'wrap',
      // Space between boxes.
      gap: SLOT_GAP,
      // Centers the full rows so leftover space is split evenly on both sides.
      justifyContent: 'center',
      // Lines rows up from the top instead of spreading them out.
      alignContent: 'flex-start',
      // Hides any box that would poke past the section's edge.
      overflow: 'hidden',
    },
    // One empty item box.
    slot: {
      // Box width.
      width: SLOT_SIZE,
      // Box height.
      height: SLOT_SIZE,
      // Darker inside than the panel, like an empty slot.
      backgroundColor: colors.background,
      // Thin outline around the box.
      borderWidth: 1,
      // Outline color from the theme.
      borderColor: colors.border,
      // Slightly rounded corners.
      borderRadius: 4,
    },
  });
}
