export const TypingMemberListLabel: React.FC<{ members: string[] }> = ({ members }) => {
  return members.length !== 0 ? (
    <div className="text-gray-400">
      {members[0]}{' '}
      {members.length > 1 ? `and ${members.length - 1} people are typing...` : 'is typing...'}
    </div>
  ) : null
}
