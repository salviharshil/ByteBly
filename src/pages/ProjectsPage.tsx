import React, { useState, useEffect } from 'react'
import { Breadcrumb } from '../components/Breadcrumb'
import { CaseStudyCard } from '../components/projects/CaseStudyCard'
import { ProjectDetails, ProjectData } from '../components/projects/ProjectDetails'
import { PROJECTS_DATA } from '../data/projectsData'

interface ProjectsPageProps {
  onNavigate: (page: string) => void
  initialProjectTitle?: string | null
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate, initialProjectTitle }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(() => {
    if (initialProjectTitle && PROJECTS_DATA[initialProjectTitle]) {
      return PROJECTS_DATA[initialProjectTitle]
    }
    return null
  })

  useEffect(() => {
    if (initialProjectTitle && PROJECTS_DATA[initialProjectTitle]) {
      setSelectedProject(PROJECTS_DATA[initialProjectTitle])
    }
  }, [initialProjectTitle])

  const handleProjectClick = (title: string) => {
    const data = PROJECTS_DATA[title] || PROJECTS_DATA['Sanderi Exporters'] || PROJECTS_DATA['Market Branding']
    setSelectedProject(data)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBack = () => {
    setSelectedProject(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="w-full">
      <Breadcrumb
        title={selectedProject ? selectedProject.title : "Case Studies"}
        parent="Home"
        current={selectedProject ? "Project Details" : "Project-2"}
        onNavigateHome={() => {
          setSelectedProject(null)
          onNavigate('home')
        }}
      />
      
      {selectedProject ? (
        <ProjectDetails
          project={selectedProject}
          onBack={handleBack}
          onNavigateContact={() => onNavigate('contact')}
        />
      ) : (
        <CaseStudyCard onProjectClick={handleProjectClick} />
      )}
    </main>
  )
}
