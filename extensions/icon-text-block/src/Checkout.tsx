import {
  Banner,
  useApi,
  useTranslate,
  reactExtension,
  BlockStack,
  InlineLayout,
  InlineStack,
  View,
  Image,
  Text,
  useSettings,
  BlockSpacer,
  TextBlock,
  InlineSpacer,
} from "@shopify/ui-extensions-react/checkout";

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const translate = useTranslate();
  const { extension } = useApi();

  const { shipping_text } = useSettings();

  return (
    <BlockStack spacing={"none"}>
      <InlineStack spacing={"base"} blockAlignment={"center"}>
        <View blockAlignment={"center"}>
          <Image
            source={
              "https://cdn.shopify.com/s/files/1/0036/4357/2269/files/dont_remove_circle-tick_svg.png?v=1701071687"
            }
          />
        </View>
        <View blockAlignment={"center"}>
          <Text size="large" emphasis="bold">
            Vet-Approved Meals
          </Text>
        </View>
      </InlineStack>
      <BlockSpacer spacing={"base"} />
      <InlineStack spacing={"base"} blockAlignment={"center"}>
        <View blockAlignment={"center"}>
          <Image
            source={
              "https://cdn.shopify.com/s/files/1/0036/4357/2269/files/dont_remove_div._1frageme0.png?v=1701071687"
            }
          />
        </View>
        <View blockAlignment={"center"}>
          <Text size="large" emphasis="bold">
            Edit, Pause or Cancel Anytime
          </Text>
        </View>
      </InlineStack>
      <BlockSpacer spacing={"base"} />
      <InlineStack spacing={"base"} blockAlignment={"center"}>
        <View>
          <Image
            source={
              "https://cdn.shopify.com/s/files/1/0036/4357/2269/files/dont_remove_div.h2d-37def549.png?v=1701071687"
            }
          />
        </View>
        <View>
          <Text size="large" emphasis="bold">
            Free Shipping
          </Text>
        </View>
      </InlineStack>
      <InlineLayout columns={['10%', 'fill']}>
        <View></View>
        <View>
          <TextBlock size="medium">{shipping_text ?? ""}</TextBlock>
        </View>
      </InlineLayout>
    </BlockStack>
  );
}
