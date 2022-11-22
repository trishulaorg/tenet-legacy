export const TypingMemberListLabel: React.FC<{ members: string[] }> = ({ members }) => {
  return members.length !== 0 ? (
    <div className="text-fontcl-light">
      {members[0]}{' '}
      {members.length > 1 ? `and ${members.length - 1} people are typing...` : 'is typing...'}
    </div>
  ) : null
}
