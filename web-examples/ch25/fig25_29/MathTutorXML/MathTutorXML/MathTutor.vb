﻿' Fig. 25.31: MathTutor.vb
' Math tutor using EquationGeneratorServiceXML to create equations.
Imports System.Net
Imports System.Xml.Linq
Imports <xmlns="http://schemas.datacontract.org/2004/07/">

Public Class MathTutor
   Private operation As String = "add" ' the default operation
   Private level As Integer = 1 ' the default difficulty level
   Private leftHandSide As String ' the left side of the equation
   Private result As Integer ' the answer

   Private WithEvents service As New WebClient() ' used to invoke service

   ' generates a new equation when user clicks button
   Private Sub generateButton_Click(ByVal sender As System.Object,
      ByVal e As System.EventArgs) Handles generateButton.Click

      ' send request to EquationGeneratorServiceXML
      service.DownloadStringAsync(New Uri(
         "http://localhost:49792/EquationGeneratorServiceXML/" &
         "Service.svc/equation/" & operation & "/" & level))
   End Sub ' generateButton_Click

   ' process web service response
   Private Sub service_DownloadStringCompleted(ByVal sender As Object,
      ByVal e As System.Net.DownloadStringCompletedEventArgs) _
      Handles service.DownloadStringCompleted

      ' check if any errors occurred in retrieving service data
      If e.Error Is Nothing Then
         ' parse response and get LeftHandSide and Result values
         Dim xmlResponse = XDocument.Parse(e.Result)
         leftHandSide = xmlResponse.<Equation>.<LeftHandSide>.Value
         result = Convert.ToInt32(xmlResponse.<Equation>.<Result>.Value)

         questionLabel.Text = leftHandSide ' display left side of equation
         okButton.Enabled = True ' enable okButton
         answerTextBox.Enabled = True ' enable answerTextBox
      End If
   End Sub ' service_DownloadStringCompleted

   ' check user's answer
   Private Sub okButton_Click(ByVal sender As System.Object,
      ByVal e As System.EventArgs) Handles okButton.Click

      If Not String.IsNullOrEmpty(answerTextBox.Text) Then
         ' get user's answer
         Dim userAnswer As Integer = Convert.ToInt32(answerTextBox.Text)

         ' determine whether user's answer is correct
         If result = userAnswer Then
            questionLabel.Text = String.Empty ' clear question
            answerTextBox.Clear() ' clear answer
            okButton.Enabled = False ' disable OK button
            MessageBox.Show("Correct! Good job!")
         Else
            MessageBox.Show("Incorrect. Try again.")
         End If
      End If
   End Sub ' okButton_Click

   ' set the operation to addition
   Private Sub additionRadioButton_CheckedChanged(
      ByVal sender As System.Object, ByVal e As System.EventArgs) _
      Handles additionRadioButton.CheckedChanged
      operation = "add"
   End Sub ' additionRadioButton_CheckedChanged

   ' set the operation to subtraction
   Private Sub subtractionRadioButton_CheckedChanged(
      ByVal sender As System.Object, ByVal e As System.EventArgs) _
      Handles subtractionRadioButton.CheckedChanged
      operation = "subtract"
   End Sub ' subtractionRadioButton_CheckedChanged

   ' set the operation to multiplication
   Private Sub multiplicationRadioButton_CheckedChanged(
      ByVal sender As System.Object, ByVal e As System.EventArgs) _
      Handles multiplicationRadioButton.CheckedChanged
      operation = "multiply"
   End Sub ' multiplicationRadioButton_CheckedChanged

   ' set difficulty level to 1
   Private Sub levelOneRadioButton_CheckedChanged(
      ByVal sender As System.Object, ByVal e As System.EventArgs) _
      Handles levelOneRadioButton.CheckedChanged
      level = 1
   End Sub ' levelOneRadioButton_CheckedChanged

   ' set difficulty level to 2
   Private Sub levelTwoRadioButton_CheckedChanged(
      ByVal sender As System.Object, ByVal e As System.EventArgs) _
      Handles levelTwoRadioButton.CheckedChanged
      level = 2
   End Sub ' levelTwoRadioButton_CheckedChanged

   ' set difficulty level to 3
   Private Sub levelThreeRadioButton_CheckedChanged(
      ByVal sender As System.Object, ByVal e As System.EventArgs) _
      Handles levelThreeRadioButton.CheckedChanged
      level = 3
   End Sub ' levelThreeRadioButton_CheckedChanged
End Class ' MathTutor

'**************************************************************************
'* (C) Copyright 1992-2011 by Deitel & Associates, Inc. and               * 
'* Pearson Education, Inc. All Rights Reserved.                           *
'*                                                                        *
'* DISCLAIMER: The authors and publisher of this book have used their     *
'* best efforts in preparing the book. These efforts include the          *
'* development, research, and testing of the theories and programs        *
'* to determine their effectiveness. The authors and publisher make       *
'* no warranty of any kind, expressed or implied, with regard to these    *
'* programs or to the documentation contained in these books. The authors *
'* and publisher shall not be liable in any event for incidental or       *
'* consequential damages in connection with, or arising out of, the       *
'* furnishing, performance, or use of these programs.                     *
'**************************************************************************
