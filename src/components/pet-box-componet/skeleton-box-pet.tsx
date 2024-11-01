import { MotiView } from "moti";

export function SkeletonBoxPet() {
    return (
        <MotiView
            from={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{
                type: "timing",
                duration: 800,
                loop: true,
            }}
            className="bg-gray-300 rounded-xl h-24 w-full mb-4"
        />
    );
}