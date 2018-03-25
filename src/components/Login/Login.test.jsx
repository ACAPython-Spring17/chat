import React from 'react';
import TextField from 'material-ui/TextField';
import Login from './Login';

describe('Login', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('when enter key is pressed', () => {
    describe('when value is empty', () => {
      it('should render en error', () => {
        const wrapper = shallow(<Login />);
        const event = {
          target: {
            value: '  ',
          },
          key: 'Enter',
        };

        wrapper.find(TextField).simulate('keyPress', event);

        expect(wrapper.find(TextField).prop('errorText'))
          .toEqual('Username cannot be empty');
      });
    });

    describe('when value is not empty', () => {
      it('should call props.onLogin and remove error', () => {
        const onLogin = jest.fn();

        const wrapper = shallow(<Login onLogin={onLogin} />);
        const event = {
          target: {
            value: 'some value',
          },
          key: 'Enter',
        };

        wrapper.find(TextField).simulate('keyPress', event);

        expect(wrapper.find(TextField).prop('errorText')).toEqual('');
        expect(onLogin).toHaveBeenCalledWith('some value');
      });
    });
  });
});
