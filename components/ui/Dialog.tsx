import React from "react";
import { AlertDialog, Button, XStack, YStack } from "tamagui";

interface DialogProps {
  isShowing: boolean;
  title?: string;
  description?: string;
  button1Name?: string;
  button1Callback?: () => void | Promise<void>;
  button2Name?: string;
  button2Callback?: () => void | Promise<void>;
  onClose?: () => void;
}

export default function Dialog({
  isShowing,
  title = "Notice",
  description = "This is notified",
  button1Name,
  button1Callback = () => {
    console.log("button1Callback");
  },
  button2Name,
  button2Callback = () => {
    console.log("button2Callback");
  },
  onClose,
}: DialogProps) {
  const handleOpenChange = (open: boolean) => {
    if (!open && onClose) {
      onClose();
    }
  };

  return (
    // FIX: Removed the 'native' prop so your custom styles render and layout cloning errors stop.
    <AlertDialog open={isShowing} onOpenChange={handleOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          transition="quick" // Note: Tamagui typically uses 'animation' rather than 'transition'
          opacity={0.5}
          backgroundColor="$background"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <AlertDialog.Content
          elevate
          key="content"
          transition="quick"
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
          maxWidth={340}
          width="90%"
          alignSelf="center"
        >
          <YStack gap="$4">
            <AlertDialog.Title color="$color">{title}</AlertDialog.Title>

            {description && (
              <AlertDialog.Description color="$color" opacity={0.8}>
                {description}
              </AlertDialog.Description>
            )}

            {/* Footer Buttons */}
            {(button1Name || button2Name) && (
              <XStack gap="$3" justifyContent="flex-end" marginTop="$2">
                {button1Name && (
                  <AlertDialog.Cancel asChild>
                    <Button
                      theme="outline"
                      borderColor="$borderColor"
                      onPress={button1Callback}
                    >
                      {button1Name}
                    </Button>
                  </AlertDialog.Cancel>
                )}

                {button2Name && (
                  <AlertDialog.Action asChild>
                    <Button theme="accent" onPress={button2Callback}>
                      {button2Name}
                    </Button>
                  </AlertDialog.Action>
                )}
              </XStack>
            )}
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}
