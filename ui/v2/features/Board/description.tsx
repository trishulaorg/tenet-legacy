type Props = {
    text?: string
}

export default function BoardDescription(props: Props) {
    const { text } = props
    return (
      <div className="text-med dark:text-med-dark mb-4">
          {text}
      </div>
    )
  }