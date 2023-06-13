export type FaqItem = {
    question: string;
    answer: string;
}

export const GraphQuestions:FaqItem[] = [
    {
        question: "What is the graph showing?",
        answer: "This graph shows the number of offsets and the total amount of offsets during a selected period.",
    },
    {
        question: "Why can’t I change the currency?",
        answer: "Currently we support only EUR, in the future, we might support your currency as well.",
    },
    {
        question: "Why is the graph still empty?",
        answer: "It could be the case that you just started to use our services or that no one compensated up to now.",
    },
];

export const GeneralQuestions:FaqItem[] = [
    {
        question: "Which emissions are offset?",
        answer: "South Pole created a database of emission factors that include the emissions that occur during raw material extraction, production, transport, the sales process and shipping to the customer. This is generally called “cradle to customer” and is offset.",
    },
    {
        question: "Will the entire contribution of the consumer go to climate compensation?",
        answer: "South Pole retains 10-20 percent of the carbon credit sale price to cover its overhead costs as well as project development (including MRV) when we are working as a project partner. This figure is an average across our portfolio of over 700 projects.",
    },
    {
        question: "What happens to the offset payment when a compensated product is returned?",
        answer: "The contribution is generally refundable together with the order total in Shopify, WooCommerce and Magento.",
    },
    {
        question: "Can businesses pay for the offsets, instead of the consumer?",
        answer: "Sure! If you do not want your customers to pay for the carbon offsetting you can choose to pay the compensation yourself on the settings page",
    },
];
