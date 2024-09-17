import { ScrollView, Text, View } from "react-native";
import { ProductComponent } from "./product-component";
import { useState } from "react";

interface ProductComponentProps {
    id: string;
    image_url: string;
    title: string;
    price: number;
}

export function HandlerListProducts() {
    const [products, setProducts] = useState<ProductComponentProps[]>([
        {
            id: "1",
            price: 2000,
            title: "Ração 1kg pedigree",
            image_url: "https://jfwzshiyyvxklcuuzueu.supabase.co/storage/v1/object/sign/my-little-pet-products/product1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJteS1saXR0bGUtcGV0LXByb2R1Y3RzL3Byb2R1Y3QxLnBuZyIsImlhdCI6MTcyNTU4NDY2MCwiZXhwIjoxNzU3MTIwNjYwfQ.62bydRduaj88hb_NdD-xhWGj89ibxDVH31ILKzGM_9c&t=2024-09-06T01%3A04%3A36.645Z"
        },
        {
            id: "2",
            price: 1499,
            title: "Pote de raça",
            image_url: "https://jfwzshiyyvxklcuuzueu.supabase.co/storage/v1/object/sign/my-little-pet-products/product2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJteS1saXR0bGUtcGV0LXByb2R1Y3RzL3Byb2R1Y3QyLnBuZyIsImlhdCI6MTcyNTc0MTQ1NiwiZXhwIjoxNzU3Mjc3NDU2fQ.YH_4_BiAx5I_uqQU5H38Jt8IHPtwyqBx4GpmCB_5Jbw&t=2024-09-07T20%3A37%3A42.379Z"
        },
        {
            id: "3",
            price: 2000,
            title: "Ração 1kg pedigree",
            image_url: "https://jfwzshiyyvxklcuuzueu.supabase.co/storage/v1/object/sign/my-little-pet-products/product1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJteS1saXR0bGUtcGV0LXByb2R1Y3RzL3Byb2R1Y3QxLnBuZyIsImlhdCI6MTcyNTU4NDY2MCwiZXhwIjoxNzU3MTIwNjYwfQ.62bydRduaj88hb_NdD-xhWGj89ibxDVH31ILKzGM_9c&t=2024-09-06T01%3A04%3A36.645Z"
        },
        {
            id: "4",
            price: 1499,
            title: "Pote de raça",
            image_url: "https://jfwzshiyyvxklcuuzueu.supabase.co/storage/v1/object/sign/my-little-pet-products/product2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJteS1saXR0bGUtcGV0LXByb2R1Y3RzL3Byb2R1Y3QyLnBuZyIsImlhdCI6MTcyNTc0MTQ1NiwiZXhwIjoxNzU3Mjc3NDU2fQ.YH_4_BiAx5I_uqQU5H38Jt8IHPtwyqBx4GpmCB_5Jbw&t=2024-09-07T20%3A37%3A42.379Z"
        },
        {
            id: "5",
            price: 2000,
            title: "Ração 1kg pedigree",
            image_url: "https://jfwzshiyyvxklcuuzueu.supabase.co/storage/v1/object/sign/my-little-pet-products/product1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJteS1saXR0bGUtcGV0LXByb2R1Y3RzL3Byb2R1Y3QxLnBuZyIsImlhdCI6MTcyNTU4NDY2MCwiZXhwIjoxNzU3MTIwNjYwfQ.62bydRduaj88hb_NdD-xhWGj89ibxDVH31ILKzGM_9c&t=2024-09-06T01%3A04%3A36.645Z"
        },
        {
            id: "6",
            price: 1499,
            title: "Pote de raça",
            image_url: "https://jfwzshiyyvxklcuuzueu.supabase.co/storage/v1/object/sign/my-little-pet-products/product2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJteS1saXR0bGUtcGV0LXByb2R1Y3RzL3Byb2R1Y3QyLnBuZyIsImlhdCI6MTcyNTc0MTQ1NiwiZXhwIjoxNzU3Mjc3NDU2fQ.YH_4_BiAx5I_uqQU5H38Jt8IHPtwyqBx4GpmCB_5Jbw&t=2024-09-07T20%3A37%3A42.379Z"
        },
    ]);
    return (
        <View className="w-full h-auto mt-6">
            <Text className="font-roboto font-bold text-2xl ml-6 mb-6">Mais vendidos</Text>
            <ScrollView horizontal>
                {products.slice(0, 5).map((product) => (
                    <ProductComponent
                        key={product.id}
                        id={product.id}
                        price={product.price}
                        title={product.title}
                        image_url={product.image_url}
                    />
                ))}

            </ScrollView>
        </View>
    )
}