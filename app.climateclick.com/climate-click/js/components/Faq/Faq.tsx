import { styled } from "styletron-react";
import { FaqItem } from "./FaqItem";

const FaqCard = styled(`div`, {
  background: `#F3F3FF`,
  padding: `20px`,
  borderRadius: `8px`,
  boxShadow: `0px 0px 4px rgba(0, 0, 0, 0.25)`,
  display: `flex`,
  flexDirection: `column`,
});

const FaqCardHeader = styled(`div`, {
  display: `flex`,
  flexDirection: `row`,
  alignItems: `center`,
  gap: `50px`,
})

const Question = styled(`h3`, {
})

const Answer = styled(`p`, {
  color: `#001649`,
  fontSize: `15px`,
})

const FaqCardImage = styled(`img`, {
  maxWidth: `100%`,
  height: `auto`,
  '@media (max-width: 768px)': {
      display: 'none'
  }
})

type FaqProps = {
  title: string
  questions: FaqItem[]
}

export const Faq = ({title, questions}:FaqProps) => {
  return ( 
    <FaqCard>
      <FaqCardHeader>
        {true && <FaqCardImage src="https://api.climateclick.com/shopify/images/explainer-world.png"/>}
        <h1>{title}</h1>
      </FaqCardHeader>
      {questions.map((q,i) => (
        <div key={"qa" + i}>
          <Question>{q.question}</Question>
          <Answer>{q.answer}</Answer>
        </div>
      ))}
      <div>
        <Question>I have another question</Question>
        <Answer>
          Please send an email to <a href="mailto:climateclick@southpole.com">climateclick@southpole.com</a>
        </Answer>
      </div>
    </FaqCard>
  )
}
