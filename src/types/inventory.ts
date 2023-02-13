/** @format */
import { useGetStateQuery } from '@app/types/queries';

export type Seeker = Required<
    NonNullable<ReturnType<typeof useGetStateQuery>['data']>['game']
>['state']['seekers'][number];

export type State = Required<NonNullable<ReturnType<typeof useGetStateQuery>['data']>['game']>['state'];

export type Tile =
    | Required<NonNullable<ReturnType<typeof useGetStateQuery>['data']>['game']>['state']['tiles'][number]
    | Required<
          NonNullable<ReturnType<typeof useGetStateQuery>['data']>['game']
      >['state']['seekers'][number]['location'][number]['tile'];

export type EdgeModel = {
    _typename?: 'Edge';
};

export type NodeModel = {
    id: string;
    _typename?: 'Node';
};

export type ResourceModel = NodeModel;

export type SlotModel = EdgeModel & {
    slot: number;
    balance: number;
    resource: ResourceModel;
};

export type BagModel = NodeModel & {
    slots: SlotModel[];
};
