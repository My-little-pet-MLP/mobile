// ProductSkeleton.tsx
import React from "react";
import { View } from "react-native";
import { MotiView } from "moti";

export function ProductSkeleton() {
    return (
        <MotiView
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{
                loop: true,
                type: "timing",
                duration: 1000,
            }}
            style={{
                borderColor: "#E5E7EB",
                borderWidth: 1,
                padding: 16,
                width: 172,
                borderRadius: 16,
                alignItems: "center",
                marginRight: 16,
                gap: 8,
            }}
        >
            <View
                style={{
                    width: 144,
                    height: 144,
                    backgroundColor: "#E5E7EB",
                    borderRadius: 8,
                }}
            />

            <View
                style={{
                    width: "100%",
                    height: 20,
                    backgroundColor: "#E5E7EB",
                    marginTop: 8,
                    borderRadius: 8,
                }}
            />

            <View
                style={{
                    width: "80%",
                    height: 20,
                    backgroundColor: "#E5E7EB",
                    marginTop: 4,
                    borderRadius: 8,
                }}
            />

            <View
                style={{
                    width: "100%",
                    height: 20,
                    backgroundColor: "#E5E7EB",
                    marginTop: 8,
                    borderRadius: 8,
                }}
            />
        </MotiView>
    );
}
