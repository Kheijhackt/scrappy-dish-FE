import { Sheet } from "@tamagui/sheet";
import React, { memo } from "react";
import { View } from "tamagui";

interface SheetSliderProps {
  isShowing: boolean;
  children: React.ReactNode;
}

export function SheetSlider({ isShowing, children }: SheetSliderProps) {
  // Setup standard state position for tracking snaps.
  const [position, setPosition] = React.useState(0);

  return (
    <Sheet
      modal={false} // Forced inline type architecture
      open={isShowing} // Bound directly to incoming explicit trigger state
      snapPointsMode="percent" // Calculated purely by window percent factors
      dismissOnSnapToBottom={false} // Clean teardown when swiped downward completely
      position={position}
      onPositionChange={setPosition}
      zIndex={100_000}
      transition="medium" // Clean slide tracking
    >
      <Sheet.Overlay
        transition="lazy"
        backgroundColor="$shadow4"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />

      <Sheet.Handle />

      <Sheet.Frame
        padding="$4"
        backgroundColor="$background"
        borderTopWidth={1}
        borderLeftWidth={1}
        borderRightWidth={1}
        borderColor="$borderColor"
        borderTopLeftRadius="$5"
        borderTopRightRadius="$5"
      >
        <SheetContentsMemoized>{children}</SheetContentsMemoized>
      </Sheet.Frame>
    </Sheet>
  );
}

// Memoized inner box frame preventing expensive application re-renders during active frame animations
interface ContentProps {
  children: React.ReactNode;
}

const SheetContentsMemoized = memo(({ children }: ContentProps) => {
  return (
    <View width="100%" flex={1} position="relative">
      {children}
    </View>
  );
});
