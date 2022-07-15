from flask import Flask, jsonify, request

from flask_cors import CORS

from textblob import TextBlob

app = Flask(__name__)
CORS(app)


@app.route("/")
def home_view():
    return "<h1>Welcome to the backend!</h1>"


@app.route("/fedrate", methods=["POST"])
def get_fed_fund_rate():
    txt = request.get_json()

    fedFund = sentiment_analysis(txt["beigeText"], txt["speechText"])
    return jsonify(fedFund), 201


def sentiment_analysis(beigeText, speechText):
    BeigeBook = TextBlob(beigeText)

    bPolarity = BeigeBook.sentiment.polarity
    bSubjectivity = BeigeBook.sentiment.subjectivity

    print(bPolarity)

    print(bSubjectivity)

    GovernorsSpeeches = TextBlob(speechText)

    gPolarity = GovernorsSpeeches.sentiment.polarity
    gSubjectivity = GovernorsSpeeches.sentiment.subjectivity

    print(gPolarity)

    print(gSubjectivity)

    LoanLossReserve = (
        0.0068
        - 0.1218 * BeigeBook.sentiment.polarity
        - 0.1362 * BeigeBook.sentiment.subjectivity
        - 0.0677 * GovernorsSpeeches.sentiment.polarity
        + 0.1962 * GovernorsSpeeches.sentiment.subjectivity
    )

    return [LoanLossReserve, bPolarity, bSubjectivity, gPolarity, gSubjectivity]


if __name__ == "__main__":
    app.run()
