import NavigationMain from './components/NavigationMain'
import DocumentPaper from './components/DocumentPaper'
import LogoutButton from './components/LogoutButton'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFCF9] pb-16">
      <LogoutButton />
      <NavigationMain />
      <DocumentPaper />
    </div>
  )
}

