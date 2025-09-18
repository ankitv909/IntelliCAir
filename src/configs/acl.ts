import { AbilityBuilder, PureAbility } from '@casl/ability'

export type Subjects = string
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete'

export type AppAbility = PureAbility<[Actions, Subjects]> | undefined;

export const AppAbility = PureAbility as any

export type ACLObj = {
  action: Actions
  subject: string
}

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (role: string, subject: string) => {
  const { can, rules } = new AbilityBuilder(AppAbility)
  can('manage', 'all')
  return rules
}

export const buildAbilityFor = (role: string, subject: string): AppAbility => {
  return new PureAbility(defineRulesFor(role, subject), {
    detectSubjectType: object => object!.type
  })
}

export const defaultACLObj: ACLObj = {
  action: 'manage',
  subject: 'all'
}

export default defineRulesFor
