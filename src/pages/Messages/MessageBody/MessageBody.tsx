import SingleMessage from "./SingleMessage";

type Props = {};
const MessageBody = (props: Props) => {
  return (
    <div>
      <div className="message-body ">
        {/* single message */}
        <SingleMessage message="Hey bro?" />
        <SingleMessage me={true} message="How are you doing?" />
        <SingleMessage
          me={true}
          message="Tailwind CSS is the only framework that I've seen scale"
        />

        <SingleMessage message="How can I help you bro? " />
        <SingleMessage
          me={true}
          message="do you have any number or somethings? I'm a full stack developer"
        />
        <SingleMessage message="yeah! I know you, you are so skill full " />
        <SingleMessage me={true} message="Are you a freelancer or a company?" />
        <SingleMessage message="Not exactly!! but i have many resource for place people. If you are interest to place somewhere. you can knock me for that. I help you my best. " />
      </div>
    </div>
  );
};

export default MessageBody;
