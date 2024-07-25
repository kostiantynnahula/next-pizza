import {
  Container,
  Filters,
  ProductCard,
  ProductsGroupList,
  Title,
  TopBar,
} from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="All Pizzas" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Filters />
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title="Pizzas"
                categoryId={1}
                items={[
                  {
                    id: 1,
                    name: "Margherita",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
                    items: [{ price: 15 }],
                  },
                  {
                    id: 2,
                    name: "Margherita",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
                    items: [{ price: 15 }],
                  },
                  {
                    id: 3,
                    name: "Margherita",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
                    items: [{ price: 15 }],
                  },
                  {
                    id: 4,
                    name: "Margherita",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
                    items: [{ price: 15 }],
                  },
                  {
                    id: 5,
                    name: "Margherita",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
                    items: [{ price: 15 }],
                  },
                ]}
              />
              <ProductsGroupList
                title="Combo"
                categoryId={2}
                items={[
                  {
                    id: 1,
                    name: "Margherita",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
                    items: [{ price: 15 }],
                  },
                  {
                    id: 2,
                    name: "Margherita",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
                    items: [{ price: 15 }],
                  },
                  {
                    id: 3,
                    name: "Margherita",
                    imageUrl:
                      "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif",
                    items: [{ price: 15 }],
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
