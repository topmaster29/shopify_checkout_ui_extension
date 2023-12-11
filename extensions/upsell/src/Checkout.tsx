import React, {useState, useEffect} from 'react'
import {
  useTranslate,
  reactExtension,
  Divider,
  Image,
  Banner,
  Heading,
  Button,
  InlineLayout,
  BlockStack,
  Text,
  SkeletonText,
  SkeletonImage,
  useCartLines,
  useApplyCartLinesChange,
  useApi,
  TextBlock,
  InlineStack,
  useSettings
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);

function Extension() {
  const { query, i18n } = useApi();
  const applyCartLinesChange = useApplyCartLinesChange();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [showError, setShowError] = useState(false);
  const { product_num, collection_handle, title} = useSettings();



  useEffect(() => {
    if(!product_num || !collection_handle)return;
    setLoading(true);
    query(
      `query ($first: Int!, $handle: String!) {
        collection(handle: $handle){
          products(first: $first) {
            nodes {
              id
              title
              images(first:1){
                nodes {
                  url
                }
              }
              handle
              variants(first: 1) {
                nodes {
                  id
                  price {
                    amount
                  }
                  compareAtPrice {
                    amount
                  }
                }
              }
              sellingPlanGroups(first: 1){
                nodes{
                  sellingPlans(first: 1){
                    nodes{
                      id
                      name
                    }
                  }
                }
                
              }
            }
          }
        }
      }`,
      {
        variables: {first: parseInt(product_num as string), handle: collection_handle},
        // variables: {first: 3, handle: "automated-collection"},
      },
    )
    .then(({data}:any) => {
      setProducts(data.collection.products.nodes);
    })
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
  }, [product_num, collection_handle]);

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => setShowError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  const lines = useCartLines();

  if(!product_num || !collection_handle){
    return (
      <Banner>Upsell: Configure settings</Banner>
    )
  }

  if (loading) {
    return (
      <BlockStack spacing="loose">
        <TextBlock emphasis="bold" size="extraLarge" inlineAlignment="center">
          {title ?? ''}
        </TextBlock>
        <BlockStack spacing="loose">
          <InlineLayout
            spacing="base"
            columns={[64, "fill", "auto"]}
            blockAlignment="center"
          >
            <SkeletonImage aspectRatio={1} />
            <BlockStack spacing="none">
              <SkeletonText inlineSize="large" />
              <SkeletonText inlineSize="small" />
            </BlockStack>
            <Button kind="secondary" disabled={true}>
              Add
            </Button>
          </InlineLayout>
        </BlockStack>
      </BlockStack>
    );
  }
  if (!loading && products.length === 0) {
    return null;
  }

  const cartLineProductVariantIds = lines.map((item) => item.merchandise.id);
  const productsOnOffer = products.filter(
    (product) => {
      const isProductVariantInCart = product.variants.nodes.some(
        ({id}) => cartLineProductVariantIds.includes(id)
      );
      return !isProductVariantInCart;
    }
  );

  if (!productsOnOffer.length) {
    return null;
  }

  const defaultImgUrl = "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_medium.png?format=webp&v=1530129081";

  return (
    <BlockStack spacing="loose">
      <TextBlock emphasis="bold" size="extraLarge" inlineAlignment="center">
      {title ?? ''}
      </TextBlock>
      <BlockStack spacing="loose">
        {productsOnOffer.map((e,i)=>(
          <InlineLayout
            spacing="base"
            columns={[64, "fill", "auto"]}
            blockAlignment="center"
            border={"base"}
            padding={"base"}
            cornerRadius={"large"}
          >
            <Image
              border="base"
              borderWidth="base"
              borderRadius="loose"
              source={e.images.nodes[0]?.url ?? defaultImgUrl}
              description={e.title}
              aspectRatio={1}
            />
            <BlockStack spacing="none">
              <Text size="medium" emphasis="strong">
                {e.title}
              </Text>
              <InlineStack>
                <Text>${e.variants.nodes[0].price.amount}</Text>
                {e.variants.nodes[0].compareAtPrice?.amount && <Text appearance="subdued" accessibilityRole="deletion">${e.variants.nodes[0].compareAtPrice?.amount ?? 0}</Text>}
                
              </InlineStack>
              {e.variants.nodes[0].compareAtPrice?.amount && (
                <Text appearance="info">
                  Save {Math.floor(Math.abs(e.variants.nodes[0].compareAtPrice?.amount - e.variants.nodes[0].price.amount)/e.variants.nodes[0].compareAtPrice?.amount * 100)}% 
                </Text>
              )}
            </BlockStack>
            <Button
              kind="secondary"
              loading={adding}
              accessibilityLabel={`Add ${e.title} to cart`}
              // to={`https://nutricanine.ca/products/${e.handle}`}

              onPress={async () => {
                setAdding(true);

                console.log('===============', e.sellingPlanGroups)
                // Apply the cart lines change
                const result = await applyCartLinesChange({
                  type: "addCartLine",
                  merchandiseId: e.variants.nodes[0].id,
                  quantity: 1,
                  // sellingPlanId: e.sellingPlanGroups.nodes[0]?.sellingPlans.nodes[0]?.id ?? null
                });
                setAdding(false);
                if (result.type === "error") {
                  // An error occurred adding the cart line
                  // Verify that you're using a valid product variant ID
                  // For example, 'gid://shopify/ProductVariant/123'
                  setShowError(true);
                  console.error(result.message);
                }

              }}
            >
            Add • ${e.variants.nodes[0].price.amount}
            </Button>
          </InlineLayout>
        ))}
        
      </BlockStack>
      {showError && (
        <Banner status="critical">
          There was an issue adding this product. Please try again.
        </Banner>
      )}
    </BlockStack>
  );
}