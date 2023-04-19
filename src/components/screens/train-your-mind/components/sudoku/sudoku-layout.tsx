import React from 'react';
import {
  View,
  ScrollView,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Text, Button} from 'native-base';

import {styles} from 'app_components/screens/train-your-mind';
import gameStyles from './styles';

const SudokuLayout = (props: any) => {
  return (
    <KeyboardAvoidingView
      style={[styles.container]}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={[styles.wrapper, gameStyles.container]}>
        <Text style={[styles.gameTitle]}>Sudoku</Text>

        {props.board.length === 0 && <ActivityIndicator size="large" />}

        {props.board.length > 0 && (
          <React.Fragment>
            <View style={[gameStyles.toolbar]}>
              {/* <Button
              onPress={props.solveSudoku}
              style={[{backgroundColor: '#39b3e2'}]}
              small
              rounded>
              <Text>Resolver</Text>
            </Button> */}

              <Button
                onPress={props.clearBoard}
                style={[{backgroundColor: '#39b3e2'}]}
                small
                rounded>
                <Text>Limpiar tablero</Text>
              </Button>
            </View>

            <View style={[gameStyles.sudokuContainer]}>
              {props.board.map((row: [], rowIndex: number) => (
                <View key={rowIndex} style={[{flex: 1}]}>
                  {row.map((cell: string, cellIndex: number) => (
                    <View
                      key={cellIndex}
                      style={[
                        gameStyles.defaultCell,
                        props.initialBoard[rowIndex][cellIndex] !== '.' && {
                          backgroundColor: '#d5eef8',
                        },
                        props.selectedRow.join() ===
                          [rowIndex, cellIndex].join() && {
                          backgroundColor: '#f3c744',
                          borderColor: '#a88a2e',
                        },
                        (rowIndex + 1) % 3 === 0 && {
                          borderRightWidth: 3,
                        },
                        (cellIndex + 1) % 3 === 0 && {
                          borderBottomWidth: 3,
                        },
                        rowIndex === row.length - 1 && {
                          borderRightWidth: 1,
                        },
                        cellIndex === props.board.length - 1 && {
                          borderBottomWidth: 1,
                        },
                        props.errors.includes(`${rowIndex}${cellIndex}`) && {
                          backgroundColor: 'rgba(233, 64, 68, 0.3)',
                        },
                      ]}>
                      {props.initialBoard[rowIndex][cellIndex] === '.' && (
                        <TextInput
                          style={[gameStyles.defaultCellInput]}
                          maxLength={1}
                          keyboardType="numeric"
                          value={cell === '.' ? '' : cell}
                          onFocus={() =>
                            props.setSelectedRow([rowIndex, cellIndex])
                          }
                          onBlur={() => props.setSelectedRow([null, null])}
                          onChangeText={(text: string) =>
                            props.handleChange(text, rowIndex, cellIndex)
                          }
                        />
                      )}
                      {props.initialBoard[rowIndex][cellIndex] !== '.' && (
                        <Text style={[gameStyles.defaultCellText]}>{cell}</Text>
                      )}
                      <View style={[{paddingTop: '100%'}]} />
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </React.Fragment>
        )}

        {props.isActive && (
          <Text style={[gameStyles.timer]}>
            {`${props.remaining.m}:${props.remaining.s}`}
          </Text>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SudokuLayout;
