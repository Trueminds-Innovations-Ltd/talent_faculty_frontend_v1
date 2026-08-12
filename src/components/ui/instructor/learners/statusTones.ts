export type PillTone = 'success' | 'warning' | 'danger' | 'info' | 'neutral'

// --- Tone lookups per status vocabulary -----------------------------------

export const learnerStatusTone = (status: string): PillTone => {
  switch (status) {
    case 'On Track':
    case 'Completed':
      return 'success'
    case 'At Risk':
      return 'danger'
    case 'Not Started':
    default:
      return 'neutral'
  }
}

export const activityStatusTone = (status: string): PillTone => {
  switch (status) {
    case 'Completed':
      return 'success'
    case 'Submitted':
      return 'info'
    case 'Low score':
      return 'warning'
    case 'Missed Deadline':
      return 'danger'
    case 'Inactive':
    case 'In active':
    default:
      return 'neutral'
  }
}

export const courseStatusTone = (status: string): PillTone => {
  switch (status) {
    case 'Completed':
      return 'success'
    case 'In progress':
      return 'warning'
    case 'At risk':
      return 'danger'
    case 'Not Started':
    default:
      return 'neutral'
  }
}

export const assignmentStatusTone = (status: string): PillTone => {
  switch (status) {
    case 'Completed':
      return 'success'
    case 'Submitted':
      return 'info'
    case 'Pending':
      return 'warning'
    case 'Missing':
      return 'danger'
    case 'Not started':
    default:
      return 'neutral'
  }
}

export const quizStatusTone = (status: string): PillTone => {
  switch (status) {
    case 'Passed':
      return 'success'
    case 'Failed':
    case 'Missing':
      return 'danger'
    case 'Not Attempted':
    default:
      return 'neutral'
  }
}
