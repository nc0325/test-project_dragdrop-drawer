import React, {useState, useEffect, useCallback, useRef} from 'react';
import ReservationsTable from './ReservationsTable';
import PendingReservationsTable from './PendingReservationsTable';
import {debounce} from 'lodash';
import AppsContainer from '../../../@crema/core/AppsContainer';
import {useIntl} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';
import {
  getPendingReservations,
  getReservations,
  reset,
} from '../../../features/reservations/reservationsSlice';
// import {reset as resetUser} from '../../../features/user/userSlice';
// import {hideEditUserModal} from '../../../features/editUserModal/editUserModalSlice';
import AppsHeader from '../../../@crema/core/AppsContainer/AppsHeader';
import AppsFooter from '../../../@crema/core/AppsContainer/AppsFooter';
import AppsContent from '../../../@crema/core/AppsContainer/AppsContent';
import AppsPagination from '../../../@crema/core/AppsPagination';
import AppRowContainer from '../../../@crema/core/AppRowContainer';
import AppCard from '../../../@crema/core/AppCard';
import {Input, Button, Modal, Col, Descriptions, Space} from 'antd';
import {SelectOutlined, CopyOutlined} from '@ant-design/icons';
import './index.style.less';
import AppPageMetadata from '../../../@crema/core/AppPageMetadata';
import ReservationForm from './ReservationForm';
import useCopyToClipboard from '../../../hooks/useCopyToClipboard';
import {useHasPermissions} from '../../../hooks/useHasPermissions';

const Reservations = () => {
  const [, copy] = useCopyToClipboard();
  const can = useHasPermissions();
  const reservationFormRef = useRef();
  const {messages} = useIntl();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pendingReservationsPage, setPendingReservationsPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false);
  const delayedDispatchgetReservations = useCallback(
    debounce((q) => dispatch(getReservations({q})), 500),
    [],
  );

  const {
    reservations,
    reservationsCount,
    isLoading,
    pendingReservations,
    pendingReservationsCount,
    isPendingReservationsLoading,
    isSuccess,
  } = useSelector((state) => state.reservations);

  const {isAccountLoading, account} = useSelector((state) => state.userInfo);

  // const {isDeleteSuccess, isCreateSuccess} = useSelector((state) => state.user);

  // const {isVisible: isVisibleEditUserModal} = useSelector(
  //   (state) => state.editUserModal,
  // );

  const onPageChange = (page) => {
    setPage(page);
    dispatch(getReservations({page, q: searchQuery}));
  };

  const onPendingReservationsPageChange = (page) => {
    setPendingReservationsPage(page);
    dispatch(getPendingReservations({page}));
  };

  const onReservationsSearch = (e) => {
    setSearchQuery(e.target.value);
    delayedDispatchgetReservations(e.target.value);
    setPage(1);
  };

  const showAddUserModal = () => {
    setIsAddUserModalVisible(true);
  };

  const handleAddUserModalOk = () => {
    setIsAddUserModalVisible(false);
    reservationFormRef?.current?.resetFields();
  };

  const handleAddUserModalCancel = () => {
    setIsAddUserModalVisible(false);
    reservationFormRef?.current?.resetFields();
  };

  // const handleEditUserModalOk = () => {
  //   dispatch(hideEditUserModal());
  //   dispatch(resetUser());
  // };

  // const handleEditUserModalCancel = () => {
  //   dispatch(hideEditUserModal());
  //   dispatch(resetUser());
  // };

  useEffect(() => {
    dispatch(getReservations({}));
    dispatch(getPendingReservations({}));
    return () => dispatch(reset());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setIsAddUserModalVisible(false);
    }
  }, [isSuccess]);

  return (
    <>
      <AppPageMetadata title='Reservations' />
      <AppRowContainer>
        <Col xs={24}>
          <AppCard heightFull className='sub-card'>
            <Descriptions layout='horizontal'>
              <Descriptions.Item
                span={3}
                label={messages['common.reservation-customer-url']}>
                <Space wrap size='small'>
                  <Button
                    loading={isAccountLoading}
                    icon={<SelectOutlined />}
                    size='small'
                    type='primary'
                    href={`https://${account?.reservation_url}`}
                    target='_blank'
                    rel='noreferrer'>
                    {messages['common.visit']}
                  </Button>
                  <Button
                    loading={isAccountLoading}
                    icon={<CopyOutlined />}
                    onClick={() =>
                      copy(
                        account?.reservation_url,
                        messages['common.copied-to-clipboard'],
                      )
                    }
                    size='small'>
                    {messages['common.copy']}
                  </Button>
                </Space>
              </Descriptions.Item>
            </Descriptions>
          </AppCard>
        </Col>
      </AppRowContainer>
      <AppRowContainer>
        <Col xs={{span: 24, order: 2}} md={{span: 16, order: 1}}>
          <AppsContainer
            title={messages['common.reservations']}
            fullView
            type='bottom'>
            <AppsHeader key={'wrap'}>
              <div className='reservation-header'>
                <div className='reservation-header-input-view'>
                  <Input
                    id='reservation-name'
                    placeholder={messages['common.search']}
                    type='search'
                    onChange={onReservationsSearch}
                  />
                </div>
                {can('create reservation') && (
                  <div className='reservation-header-right'>
                    <Button type='primary' onClick={showAddUserModal}>
                      {messages['common.add']}
                    </Button>
                  </div>
                )}
              </div>
            </AppsHeader>

            <AppsContent
              key={'wrap1'}
              style={{
                paddingTop: 10,
                paddingBottom: 10,
              }}>
              <ReservationsTable
                loading={isLoading}
                reservations={reservations}
              />
            </AppsContent>
            <AppsFooter>
              <AppsPagination
                key={'wrap2'}
                className='reservation-footer-pagination'
                pageSize={20}
                count={reservationsCount}
                page={page}
                onChange={onPageChange}
              />
            </AppsFooter>
          </AppsContainer>
        </Col>
        <Col xs={{span: 24, order: 1}} md={{span: 8, order: 2}}>
          <AppsContainer
            title={messages['common.pending-reservations']}
            fullView
            type='bottom'>
            <AppsHeader key={'wrap'}>
              <div className='reservation-header'></div>
            </AppsHeader>

            <AppsContent
              key={'wrap1'}
              style={{
                paddingTop: 10,
                paddingBottom: 10,
              }}>
              <PendingReservationsTable
                loading={isPendingReservationsLoading}
                pendingReservations={pendingReservations}
              />
            </AppsContent>
            <AppsFooter>
              <AppsPagination
                key={'wrap2'}
                className='reservation-footer-pagination'
                pageSize={20}
                count={pendingReservationsCount}
                page={pendingReservationsPage}
                onChange={onPendingReservationsPageChange}
              />
            </AppsFooter>
          </AppsContainer>
        </Col>
      </AppRowContainer>

      <Modal
        key='add'
        title={messages['common.add-user']}
        visible={isAddUserModalVisible}
        onOk={handleAddUserModalOk}
        footer={false}
        onCancel={handleAddUserModalCancel}>
        <ReservationForm formRef={reservationFormRef} />
      </Modal>
      {/* <Modal
        key='edit'
        title={messages['common.edit-user']}
        visible={isVisibleEditUserModal}
        onOk={handleEditUserModalOk}
        footer={false}
        onCancel={handleEditUserModalCancel}>
        <ReservationForm type='edit' />
      </Modal> */}
    </>
  );
};

export default Reservations;
