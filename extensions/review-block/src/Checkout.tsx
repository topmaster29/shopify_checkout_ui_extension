import {
  Banner,
  useApi,
  useTranslate,
  reactExtension,
  BlockLayout,
  View,
  TextBlock,
  BlockStack,
  InlineLayout,
  Image,
  InlineStack,
  InlineSpacer,
  useSettings,
} from "@shopify/ui-extensions-react/checkout";

export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const translate = useTranslate();
  const { extension } = useApi();
  const {
    review_content_1,
    review_content_2,
    review_content_3,
    review_name_1,
    review_name_2,
    review_name_3,
    bottom_text
  } = useSettings();

  return (
    <BlockLayout spacing={"base"} padding={"none"}>
      <BlockStack
        spacing={"base"}
        border={"base"}
        padding={"base"}
        cornerRadius={"large"}
      >
        <View display="block" inlineAlignment={"center"}>
          <Image
            source={
              "https://cdn.shopify.com/s/files/1/0036/4357/2269/files/dont_remove_Stars.png?v=1701069109"
            }
          />
        </View>
        <TextBlock inlineAlignment="center" emphasis="bold">
          {review_content_1 ?? "Content"}
        </TextBlock>
        <View inlineAlignment={"center"} blockAlignment={"center"}>
          <InlineStack
            blockAlignment={"center"}
            spacing={"none"}
            inlineAlignment={"center"}
          >
            <View blockAlignment={"center"}>
              <TextBlock size="small">{review_name_1 ?? "Name"}</TextBlock>
            </View>
            <InlineSpacer spacing={"tight"} />
            <View blockAlignment={"center"}>
              <Image
                source={
                  "https://cdn.shopify.com/s/files/1/0036/4357/2269/files/dont_remove_Outer.png?v=1701069109"
                }
              />
            </View>
          </InlineStack>
        </View>
      </BlockStack>
      <BlockStack
        spacing={"base"}
        border={"base"}
        padding={"base"}
        cornerRadius={"large"}
      >
        <View display="block" inlineAlignment={"center"}>
          <Image
            source={
              "https://cdn.shopify.com/s/files/1/0036/4357/2269/files/dont_remove_Stars.png?v=1701069109"
            }
          />
        </View>
        <TextBlock inlineAlignment="center" emphasis="bold">
          {review_content_2 ?? "Content"}
        </TextBlock>
        <View inlineAlignment={"center"} blockAlignment={"center"}>
          <InlineStack
            blockAlignment={"center"}
            spacing={"none"}
            inlineAlignment={"center"}
          >
            <View blockAlignment={"center"}>
              <TextBlock size="small">{review_name_2 ?? "Name"}</TextBlock>
            </View>
            <InlineSpacer spacing={"tight"} />
            <View blockAlignment={"center"}>
              <Image
                source={
                  "https://cdn.shopify.com/s/files/1/0036/4357/2269/files/dont_remove_Outer.png?v=1701069109"
                }
              />
            </View>
          </InlineStack>
        </View>
      </BlockStack>
      <BlockStack
        spacing={"base"}
        border={"base"}
        padding={"base"}
        cornerRadius={"large"}
      >
        <View display="block" inlineAlignment={"center"}>
          <Image
            source={
              "https://cdn.shopify.com/s/files/1/0036/4357/2269/files/dont_remove_Stars.png?v=1701069109"
            }
          />
        </View>
        <TextBlock inlineAlignment="center" emphasis="bold">
          {review_content_3 ?? "Content"}
        </TextBlock>
        <View inlineAlignment={"center"} blockAlignment={"center"}>
          <InlineStack
            blockAlignment={"center"}
            spacing={"none"}
            inlineAlignment={"center"}
          >
            <View blockAlignment={"center"}>
              <TextBlock size="small">{review_name_3 ?? "Name"}</TextBlock>
            </View>
            <InlineSpacer spacing={"tight"} />
            <View blockAlignment={"center"}>
              <Image
                source={
                  "https://cdn.shopify.com/s/files/1/0036/4357/2269/files/dont_remove_Outer.png?v=1701069109"
                }
              />
            </View>
          </InlineStack>
        </View>
      </BlockStack>
      <TextBlock>
        {bottom_text ?? "Bottom text"}
      </TextBlock>
    </BlockLayout>
  );
}
